import { File } from '$lib/scripts/common/File';
import type PluginConfig from '$lib/scripts/configs/PluginConfig';
import ViewImportsGenerator from '../../4.40.x/cshtml/ViewImportsGenerator';
import { addView } from '../../ViewsSingleton';

export default class AdminConfigurationBaseGenerator450 extends ViewImportsGenerator {
	generate(config: PluginConfig): File[] {
		const path = ['Areas', 'Admin', 'Views'];
		const name = '_ViewImports';
		const extension = 'cshtml';
		addView(path, name, extension);
		return [new File(name, extension, path, this.generateContent(config))];
	}

	protected generateContent(config: PluginConfig): string {
		let content = super.generateContent(config);

		content += '\n\n@inject INopHtmlHelper NopHtml';

		return content;
	}
}
