import type { File } from '$lib/scripts/common/File';
import type PluginConfig from '../common/configs/PluginConfig';
import CSharpFileGenerator from './CSharpFileGenerator';
import { CsprojFileGenerator } from './CsprojFileGenerator';
import { JsonFileGenerator } from './JsonFileGenerator';

export class FileGenerator {
	static generate(config: PluginConfig): File[] {
		console.log('4.40.x');
		const files: File[] = [];

		files.push(JsonFileGenerator.generatePluginsJsonFile(config));
		files.push(CsprojFileGenerator.generateProjectFile(config));
		files.push(CSharpFileGenerator.generateBasePluginClass(config));
		files.push(CSharpFileGenerator.generatePluginDefaultsClass(config));

		FileGenerator.updateFileIds(files);

		return files;
	}

	private static updateFileIds(files: File[]) {
		files.forEach((file, index) => {
			file.id = index;
		});
	}
}
