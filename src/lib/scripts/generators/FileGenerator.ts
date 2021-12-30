import type { File } from '$lib/scripts/common/File';
import type PluginConfig from '../configs/PluginConfig';
import { Version } from '../common/Version';
import { GeneratorLanguages } from './GeneratorLanguages';
import type IFileGenerator from './IFileGenerator';

export class FileGenerator {
	private static readonly defaultModuleVersion = Version.v4_40_x;

	static async generate(config: PluginConfig): Promise<File[]> {
		const files: File[] = [];
		const version = config.base.nopCommerceVersion;

		const basePlugin = await this.loadModule(version, GeneratorLanguages.CSHARP, 'BasePluginGenerator');
		const pluginDefaults = await this.loadModule(version, GeneratorLanguages.CSHARP, 'PluginDefaultsGenerator');
		const pluginJson = await this.loadModule(version, GeneratorLanguages.JSON, 'PluginJsonGenerator');
		const projectFile = await this.loadModule(version, GeneratorLanguages.CSPROJ, 'ProjectFileGenerator');

		files.push(pluginJson.generate(config));
		files.push(projectFile.generate(config));
		files.push(basePlugin.generate(config));
		files.push(pluginDefaults.generate(config));

		if (config.settings.enabled) {
			const pluginSettings = await this.loadModule(version, GeneratorLanguages.CSHARP, 'PluginSettingsGenerator');

			files.push(pluginSettings.generate(config));
		}

		FileGenerator.updateFileIds(files);

		return files;
	}

	private static updateFileIds(files: File[]) {
		files.forEach((file, index) => {
			file.id = index;
		});
	}

	private static async loadModule(version: string, language: GeneratorLanguages, moduleName: string): Promise<IFileGenerator> {
		try {
			// load module
			const module = await import(`./${version}/${language}/${moduleName}.ts`).catch(); // default catch to avoid logging exceptions into developer console

			// convert to typed module
			const typedModule = new module.default() as IFileGenerator;
			return typedModule;
		} catch (error) {
			// module not found, use default module
			if (version != this.defaultModuleVersion) {
				return await this.loadModule(this.defaultModuleVersion, language, moduleName);
			}
		}
	}
}
