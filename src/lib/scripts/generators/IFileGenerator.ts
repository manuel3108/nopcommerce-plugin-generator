import type PluginConfig from '$lib/scripts/configs/PluginConfig';
import type { File } from '$lib/scripts/common/File';

export default interface IFileGenerator {
	generate(config: PluginConfig): File;
}
