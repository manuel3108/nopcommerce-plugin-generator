import type { File } from '$lib/scripts/common/File';
import type PluginConfig from '../configs/PluginConfig';
import { Version } from '../common/Version';
import { GeneratorLanguages } from './GeneratorLanguages';
import type IFileGenerator from './IFileGenerator';
import { clearLanguageResource } from './LanguageResourceSingleton';
import { clearViews } from './ViewsSingleton';

export class FileGenerator {
	private static readonly defaultModuleVersion = Version.v4_40_x;

	static async generate(config: PluginConfig): Promise<File[]> {
		const generators: IFileGenerator[] = [];
		const version = config.base.nopCommerceVersion;

		// cleanup from last run
		clearLanguageResource();
		clearViews();

		// generate files
		const pluginDefaults = await this.loadModule(version, GeneratorLanguages.CSHARP, 'PluginDefaultsGenerator');
		const pluginJson = await this.loadModule(version, GeneratorLanguages.JSON, 'PluginJsonGenerator');

		generators.push(pluginJson);
		generators.push(pluginDefaults);

		if (config.settings.properties.length > 0) {
			const pluginSettings = await this.loadModule(version, GeneratorLanguages.CSHARP, 'PluginSettingsGenerator');
			const adminConfigModel = await this.loadModule(version, GeneratorLanguages.CSHARP, 'AdminConfigurationModelGenerator');
			const adminConfigController = await this.loadModule(version, GeneratorLanguages.CSHARP, 'AdminConfigurationControllerGenerator');
			const configBaseView = await this.loadModule(version, GeneratorLanguages.CSHTML, 'AdminConfigurationBaseGenerator');
			const configSettingsView = await this.loadModule(version, GeneratorLanguages.CSHTML, 'AdminConfigurationSettingsGenerator');
			const viewImports = await this.loadModule(version, GeneratorLanguages.CSHTML, 'ViewImportsGenerator');

			generators.push(pluginSettings);
			generators.push(adminConfigModel);
			generators.push(adminConfigController);
			generators.push(configBaseView);
			generators.push(configSettingsView);
			generators.push(viewImports);
		}

		if (config.services.serviceClasses.length > 0) {
			const serviceClasses = await this.loadModule(version, GeneratorLanguages.CSHARP, 'ServiceClassesGenerator');

			generators.push(serviceClasses);
		}

		// we need to generate this file after all other files are generated, because it depends on the language resource generated by the other files
		const basePlugin = await this.loadModule(version, GeneratorLanguages.CSHARP, 'BasePluginGenerator');
		generators.push(basePlugin);

		// we need to generate this file after all other files are generated, because it depends on views generated
		const projectFile = await this.loadModule(version, GeneratorLanguages.CSPROJ, 'ProjectFileGenerator');
		generators.push(projectFile);

		const files = this.generateFiles(generators, config);

		// update file ids
		FileGenerator.updateFileIds(files);

		return files;
	}

	private static generateFiles(generators: IFileGenerator[], config: PluginConfig): File[] {
		let files: File[] = [];

		generators.forEach((generator) => {
			const generatedFiles = generator.generate(config);
			files = files.concat(generatedFiles);
		});

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
