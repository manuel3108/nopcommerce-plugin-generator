import type PluginConfig from '$lib/scripts/common/configs/PluginConfig';
import type { File } from '$lib/scripts/common/File';

export default interface IJsonFileGenerator {
	generatePluginsJsonFile(config: PluginConfig): File;
}
