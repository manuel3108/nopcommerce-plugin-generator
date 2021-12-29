import { File } from '../common/File';
import { Intend } from '$lib/csharp/common/Defaults';
import { generateDllFileName } from '../common/FilePathName';
import type PluginConfig from '../common/configs/PluginConfig';

export class JsonFileGenerator {
	static generatePluginsJsonFile(config: PluginConfig): File {
		return new File(
			'plugin',
			'json',
			[],
			JSON.stringify(this.generatePluginsJsonContent(config), null, Intend)
		);
	}

	static generatePluginsJsonContent(config: PluginConfig): any {
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
