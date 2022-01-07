import { File } from '$lib/scripts/common/File';
import type PluginConfig from '$lib/scripts/configs/PluginConfig';
import type { Service } from '$lib/scripts/configs/PluginServicesConfig';
import Class from '$lib/scripts/csharp-lib/base/Class';
import { generateClassNamespace, getDefaultInterfaceName } from '$lib/scripts/csharp-lib/common/Helper';
import type IFileGenerator from '../../IFileGenerator';

export default class ServiceClassesGenerator implements IFileGenerator {
	generate(config: PluginConfig): File[] {
		const files: File[] = [];
		const path = ['Services'];

		for (const serviceClass of config.services.serviceClasses) {
			const class_ = new File(serviceClass.name, 'cs', path, this.generateServiceClassContent(serviceClass, path, config));
			const interface_ = new File(
				serviceClass.interfaceName || getDefaultInterfaceName(serviceClass.name),
				'cs',
				path,
				this.generateServiceInterfaceContent(serviceClass, path, config)
			);

			files.push(class_);
			files.push(interface_);
		}

		return files;
	}

	protected generateServiceInterfaceContent(serviceClass: Service, path: string[], config: PluginConfig): string {
		const myInterface = new Class(
			generateClassNamespace(config.base.nameSpace, path),
			serviceClass.interfaceName || getDefaultInterfaceName(serviceClass.name),
			{
				addCtor: false,
				addRegions: false
			}
		);

		return myInterface.toString();
	}

	protected generateServiceClassContent(serviceClass: Service, path: string[], config: PluginConfig): string {
		const myClass = new Class(generateClassNamespace(config.base.nameSpace, path), serviceClass.name, {
			addCtor: true,
			addRegions: true
		});

		myClass.inheritsFrom = serviceClass.interfaceName || getDefaultInterfaceName(serviceClass.name);

		return myClass.toString();
	}
}
