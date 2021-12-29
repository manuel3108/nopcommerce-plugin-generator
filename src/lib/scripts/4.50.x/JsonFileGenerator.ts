import { JsonFileGenerator as JsonFileGenerator4_40_x } from '../4.40.x/JsonFileGenerator';
import type PluginConfig from '../common/configs/PluginConfig';

export class JsonFileGenerator extends JsonFileGenerator4_40_x {
	static override generatePluginsJsonContent(config: PluginConfig): any {
		const content = super.generatePluginsJsonContent(config);

		// update version
		content.SupportedVersions = ['4.50'];

		return content;
	}
}
