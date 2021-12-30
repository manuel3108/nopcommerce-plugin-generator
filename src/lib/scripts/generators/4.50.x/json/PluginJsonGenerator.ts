import PluginJsonGenerator4_40_x from '../../4.40.x/json/PluginJsonGenerator';
import type PluginConfig from '../../../configs/PluginConfig';

export default class PluginJsonGenerator extends PluginJsonGenerator4_40_x {
	override generatePluginsJsonContent(config: PluginConfig): Record<string, unknown> {
		const content = super.generatePluginsJsonContent(config);

		// update version
		content.SupportedVersions = ['4.50'];

		return content;
	}
}
