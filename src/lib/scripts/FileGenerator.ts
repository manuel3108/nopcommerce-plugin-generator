import type { File } from './common/File';
import { CsprojFileGenerator } from './CsprojFileGenerator';
import { JsonFileGenerator } from './JsonFileGenerator';

export class FileGenerator {
	static generate(): File[] {
		const files: File[] = [];

		files.push(JsonFileGenerator.generatePluginsJson());
		files.push(JsonFileGenerator.generatePluginsJson2());
		files.push(CsprojFileGenerator.generateProjectFile());

		return files;
	}
}
