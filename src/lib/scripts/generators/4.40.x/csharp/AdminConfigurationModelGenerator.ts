import { DataTypes } from '$lib/scripts/common/DataTypes';
import { NopResourceDisplayAttributeName, NopResourceDisplayNamePrefix, OverrideForStoreSuffix } from '$lib/scripts/common/Defaults';
import { File } from '$lib/scripts/common/File';
import type PluginConfig from '$lib/scripts/configs/PluginConfig';
import Field from '$lib/scripts/csharp-lib/base/Field';
import FieldAttribute from '$lib/scripts/csharp-lib/base/FieldAttribute';
import Record from '$lib/scripts/csharp-lib/base/Record';
import { Using } from '$lib/scripts/csharp-lib/base/Using';
import { Visibility } from '$lib/scripts/csharp-lib/base/Visibility';
import { generateClassNamespace } from '$lib/scripts/csharp-lib/common/Helper';
import type IFileGenerator from '../../IFileGenerator';
import { addLanguageResource } from '../../LanguageResourceSingleton';

export default class PluginSettingsGenerator implements IFileGenerator {
	generate(config: PluginConfig): File[] {
		const className = 'ConfigurationModel';
		const path = ['Areas', 'Admin', 'Models'];
		return [new File(className, 'cs', path, this.generateContent(config, className, path))];
	}

	protected generateContent(config: PluginConfig, className: string, filePath: string[]): string {
		const settingsClass = new Record(generateClassNamespace(config.base.nameSpace, filePath), className, {
			addCtor: false,
			addRegions: false
		});
		settingsClass.inheritsFrom = 'BaseNopModel';
		settingsClass.usings.push(new Using('Nop.Web.Framework.Mvc.ModelBinding'));
		settingsClass.usings.push(new Using('Nop.Web.Framework.Models'));

		// add store scope
		settingsClass.addField(
			new Field(Visibility.Public, 'ActiveStoreScopeConfiguration', DataTypes.Integer, {
				hasGetterAndSetter: true,
				isConstant: false,
				isReadonly: false,
				additionalNewLine: true
			}),
			false
		);

		config.settings.properties.forEach((property) => {
			const languageResourceName = NopResourceDisplayNamePrefix + config.details.systemName + '.Configuration.' + property.name;
			addLanguageResource(languageResourceName, property.name);

			// add field
			settingsClass.addField(
				new Field(Visibility.Public, property.name, property.type, {
					hasGetterAndSetter: true,
					isConstant: false,
					isReadonly: false,
					attribute: new FieldAttribute(NopResourceDisplayAttributeName + '("' + languageResourceName + '")'),
					additionalNewLine: false
				}),
				false
			);

			// add override for store field
			settingsClass.addField(
				new Field(Visibility.Public, property.name + OverrideForStoreSuffix, DataTypes.Boolean, {
					hasGetterAndSetter: true,
					isConstant: false,
					isReadonly: false,
					additionalNewLine: true
				}),
				false
			);
		});

		return settingsClass.toString();
	}
}
