import Class from '$lib/scripts/csharp-lib/base/Class';
import Field from '$lib/scripts/csharp-lib/base/Field';
import { Visibility } from '$lib/scripts/csharp-lib/base/Visibility';
import type PluginConfig from '$lib/scripts/configs/PluginConfig';
import { File } from '$lib/scripts/common/File';
import type IFileGenerator from '../../IFileGenerator';
import { DataTypes } from '$lib/scripts/common/DataTypes';

export default class PluginDefaultsGenerator implements IFileGenerator {
	generate(config: PluginConfig): File {
		const className = config.base.pluginName + 'Defaults';
		return new File(className, 'cs', [], this.generatePluginDefaultsClassContent(config, className));
	}

	protected generatePluginDefaultsClassContent(config: PluginConfig, className: string): string {
		const defaultsClass = new Class(config.base.nameSpace, className, false, false);

		defaultsClass.addField(
			new Field(Visibility.Public, 'SystemName', DataTypes.String, {
				value: `"${config.details.systemName}"`,
				isConstant: true,
				isReadonly: false,
				hasGetterAndSetter: false
			}),
			false
		);

		return defaultsClass.toString();
	}
}
