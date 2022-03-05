import type { File } from '$lib/scripts/common/File';
import type PluginConfig from '$lib/scripts/configs/PluginConfig';
import ProjectFileGenerator from '../../4.40.x/csproj/ProjectFileGenerator';

export default class ProjectFileGenerator450 extends ProjectFileGenerator {
	generate(config: PluginConfig): File[] {
		const file = super.generate(config);
		file[0].content = file[0].content.replace('net5.0', 'net6.0');

		return file;
	}
}
