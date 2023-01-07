import type PluginConfig from '$lib/scripts/configs/PluginConfig';
import type { File } from '$lib/scripts/common/File';
import BasePluginGenerator from '../../4.40.x/csharp/BasePluginGenerator';

export default class BasePluginGenerator450 extends BasePluginGenerator {
	generate(config: PluginConfig): File[] {
		const files = super.generate(config);
		files[0].content = files[0].content.replace('_localizationService.AddLocaleResourceAsync', '_localizationService.AddOrUpdateLocaleResourceAsync');

		return files;
	}
}
