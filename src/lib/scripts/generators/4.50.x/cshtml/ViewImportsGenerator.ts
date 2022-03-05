import type PluginConfig from '$lib/scripts/configs/PluginConfig';
import ViewImportsGenerator from '../../4.40.x/cshtml/ViewImportsGenerator';

export default class AdminConfigurationBaseGenerator450 extends ViewImportsGenerator {
	protected override generateContent(config: PluginConfig): string {
		let content = super.generateContent(config);

		content += '\n\n@inject INopHtmlHelper NopHtml';

		return content;
	}
}
