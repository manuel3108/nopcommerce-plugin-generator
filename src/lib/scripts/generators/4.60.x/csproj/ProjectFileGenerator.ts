import type { File } from '$lib/scripts/common/File';
import type PluginConfig from '$lib/scripts/configs/PluginConfig';
import ProjectFileGenerator450 from '../../4.50.x/csproj/ProjectFileGenerator';

export default class ProjectFileGenerator460 extends ProjectFileGenerator450 {
	generate(config: PluginConfig): File[] {
		const file = super.generate(config);
		file[0].content = file[0].content.replace('net6.0', 'net7.0');

		return file;
	}
}
