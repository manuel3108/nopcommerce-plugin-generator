import JsonFileGenerator4_40_x from '../4.40.x/JsonFileGenerator';
import type PluginConfig from '../../common/configs/PluginConfig';

export default class JsonFileGenerator extends JsonFileGenerator4_40_x {
	override generatePluginsJsonContent(config: PluginConfig): Record<string, unknown> {
		const content = super.generatePluginsJsonContent(config);

		// update version
		content.SupportedVersions = ['4.50'];

		return content;
	}
}
