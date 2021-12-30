import { File } from '$lib/scripts/common/File';
import type PluginConfig from '$lib/scripts/configs/PluginConfig';
import Class from '$lib/scripts/csharp-lib/base/Class';
import Field from '$lib/scripts/csharp-lib/base/Field';
import { Visibility } from '$lib/scripts/csharp-lib/base/Visibility';
import { forEach } from 'jszip';
import type IFileGenerator from '../../IFileGenerator';

export default class PluginSettingsGenerator implements IFileGenerator {
	generate(config: PluginConfig): File {
		const className = config.base.pluginName + 'Settings';
		return new File(className, 'cs', [], this.generateContent(config, className));
	}

	protected generateContent(config: PluginConfig, className: string): string {
		const settingsClass = new Class(config.base.nameSpace, className, false, false);

		config.settings.properties.forEach((property) => {
			settingsClass.addField(
				new Field(Visibility.Public, property.name, property.type, {
					hasGetterAndSetter: true,
					isConstant: false,
					isReadonly: false
				}),
				false
			);
		});

		return settingsClass.toString();
	}
}
