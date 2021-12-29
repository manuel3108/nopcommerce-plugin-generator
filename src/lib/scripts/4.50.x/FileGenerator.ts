import type { File } from '$lib/scripts/common/File';
import CSharpFileGenerator from '../4.40.x/CSharpFileGenerator';
import { CsprojFileGenerator } from '../4.40.x/CsprojFileGenerator';
import type PluginConfig from '../common/configs/PluginConfig';
import { JsonFileGenerator } from './JsonFileGenerator';

export class FileGenerator {
	static generate(config: PluginConfig): File[] {
		const files: File[] = [];
		console.log('4.50.x');

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
