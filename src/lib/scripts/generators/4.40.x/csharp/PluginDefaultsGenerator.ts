import Class from '$lib/csharp/base/Class';
import Field from '$lib/csharp/base/Field';
import { Visibility } from '$lib/csharp/base/Visibility';
import type PluginConfig from '$lib/scripts/common/configs/PluginConfig';
import { File } from '$lib/scripts/common/File';
import type IFileGenerator from '../../IFileGenerator';

export default class PluginDefaultsGenerator implements IFileGenerator {
	generate(config: PluginConfig): File {
		const className = config.base.pluginName + 'Defaults';
		return new File(className, 'cs', [], this.generatePluginDefaultsClassContent(config, className));
	}

	protected generatePluginDefaultsClassContent(config: PluginConfig, className: string): string {
		const defaultsClass = new Class(config.base.nameSpace, className, false, false);

		defaultsClass.addField(new Field(Visibility.Public, 'SystemName', 'string', `"${config.details.systemName}"`, true, false), false);

		return defaultsClass.toString();
	}
}
