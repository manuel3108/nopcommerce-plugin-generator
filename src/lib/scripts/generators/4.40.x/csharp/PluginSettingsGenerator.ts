import { File } from '$lib/scripts/common/File';
import type PluginConfig from '$lib/scripts/configs/PluginConfig';
import Class from '$lib/scripts/csharp-lib/base/Class';
import Field from '$lib/scripts/csharp-lib/base/Field';
import { Using } from '$lib/scripts/csharp-lib/base/Using';
import { Visibility } from '$lib/scripts/csharp-lib/base/Visibility';
import type IFileGenerator from '../../IFileGenerator';

export default class PluginSettingsGenerator implements IFileGenerator {
	generate(config: PluginConfig): File {
		const className = config.base.pluginName + 'Settings';
		return new File(className, 'cs', [], this.generateContent(config, className));
	}

	protected generateContent(config: PluginConfig, className: string): string {
		const settingsClass = new Class(config.base.nameSpace, className, {
			addCtor: false,
			addRegions: false
		});

		settingsClass.inheritsFrom = 'ISettings';
		settingsClass.usings.push(new Using('Nop.Core.Configuration'));

		config.settings.properties.forEach((property) => {
			settingsClass.addField(
				new Field(Visibility.Public, property.name, property.type, {
					hasGetterAndSetter: true,
					isConstant: false,
					isReadonly: false,
					additionalNewLine: false
				}),
				false
			);
		});

		return settingsClass.toString();
	}
}
