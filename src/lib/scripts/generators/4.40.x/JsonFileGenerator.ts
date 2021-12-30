import { File } from '$lib/scripts/common/File';
import { Intend } from '$lib/csharp/common/Defaults';
import { generateDllFileName } from '$lib/scripts/common/FilePathName';
import type PluginConfig from '$lib/scripts/common/configs/PluginConfig';

export default class JsonFileGenerator {
	generatePluginsJsonFile(config: PluginConfig): File {
		return new File('plugin', 'json', [], JSON.stringify(this.generatePluginsJsonContent(config), null, Intend));
	}

	generatePluginsJsonContent(config: PluginConfig): Record<string, unknown> {
		return {
			Group: config.details.group,
			FriendlyName: config.details.friendlyName,
			SystemName: config.details.systemName,
			Version: config.details.version,
			SupportedVersions: ['4.40'],
			Author: config.details.author,
			DisplayOrder: 1,
			FileName: generateDllFileName(config.base),
			Description: config.details.description
		};
	}
}
