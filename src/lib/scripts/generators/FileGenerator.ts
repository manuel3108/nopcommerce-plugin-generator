import type { File } from '$lib/scripts/common/File';
import { CsprojFileGenerator } from './4.40.x/CsprojFileGenerator';
import type PluginConfig from '../common/configs/PluginConfig';
import { Version } from '../common/Version';
import type ICSharpFileGenerator from './interfaces/ICsharpFileGenerator';
import type IJsonFileGenerator from './interfaces/IJsonFileGenerator';

export class FileGenerator {
	private static readonly defaultModuleVersion = Version.v4_40_x;

	static async generate(config: PluginConfig): Promise<File[]> {
		const files: File[] = [];
		console.log(config.base.nopCommerceVersion);

		const csFileGenerator = await this.loadModule<ICSharpFileGenerator>(config.base.nopCommerceVersion, 'CSharpFileGenerator');
		const jsonFileGenerator = await this.loadModule<IJsonFileGenerator>(config.base.nopCommerceVersion, 'JsonFileGenerator');

		files.push(jsonFileGenerator.generatePluginsJsonFile(config));
		files.push(CsprojFileGenerator.generateProjectFile(config));
		files.push(csFileGenerator.generateBasePluginClass(config));
		files.push(csFileGenerator.generatePluginDefaultsClass(config));

		FileGenerator.updateFileIds(files);

		return files;
	}

	private static updateFileIds(files: File[]) {
		files.forEach((file, index) => {
			file.id = index;
		});
	}

	private static async loadModule<T>(version: string, moduleName: string): Promise<T> {
		try {
			// load module
			const module = await import(`./${version}/${moduleName}.ts`).catch(); // default catch to avoid logging exceptions into console

			// convert to typed module
			const typedModule = new module.default() as T;
			return typedModule;
		} catch (error) {
			// module not found, use default module
			if (version != this.defaultModuleVersion) {
				return await this.loadModule(this.defaultModuleVersion, moduleName);
			}
		}
	}
}
