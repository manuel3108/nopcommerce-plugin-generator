import type PluginConfig from '../../../configs/PluginConfig';
import PluginJsonGenerator450 from '../../4.50.x/json/PluginJsonGenerator';

export default class PluginJsonGenerator460 extends PluginJsonGenerator450 {
	override generatePluginsJsonContent(config: PluginConfig): Record<string, unknown> {
		const content = super.generatePluginsJsonContent(config);

		// update version
		content.SupportedVersions = ['4.60'];

		return content;
	}
}
