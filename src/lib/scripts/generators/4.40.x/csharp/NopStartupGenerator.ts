import Class from '$lib/scripts/csharp-lib/base/Class';
import Field from '$lib/scripts/csharp-lib/base/Field';
import { Visibility } from '$lib/scripts/csharp-lib/base/Visibility';
import type PluginConfig from '$lib/scripts/configs/PluginConfig';
import { File } from '$lib/scripts/common/File';
import type IFileGenerator from '../../IFileGenerator';
import { DataTypes } from '$lib/scripts/common/DataTypes';
import { generateClassNamespace, getDefaultInterfaceName } from '$lib/scripts/csharp-lib/common/Helper';
import { Using } from '$lib/scripts/csharp-lib/base/Using';
import Method from '$lib/scripts/csharp-lib/base/Method';
import { Parameter } from '$lib/scripts/csharp-lib/base/Parameter';

export default class DependencyRegistrarGenerator implements IFileGenerator {
	generate(config: PluginConfig): File[] {
		const className = 'NopStartup';
		const path = ['Infrastructure'];
		return [new File(className, 'cs', path, this.generatesContent(config, className, path))];
	}

	protected generatesContent(config: PluginConfig, className: string, path: string[]): string {
		const myClass = new Class(generateClassNamespace(config.base.nameSpace, path), className, {
			addCtor: false,
			addRegions: true
		});

		// inheritance
		myClass.inheritsFrom = 'INopStartup';

		// usings
		myClass.usings.push(new Using('Microsoft.Extensions.DependencyInjection'));
		myClass.usings.push(new Using('Microsoft.AspNetCore.Builder'));
		myClass.usings.push(new Using('Microsoft.AspNetCore.Http'));
		myClass.usings.push(new Using('Microsoft.Extensions.Configuration'));
		myClass.usings.push(new Using('Nop.Core.Infrastructure'));

		myClass.usings.push(new Using(generateClassNamespace(config.base.nameSpace, ['Services'])));

		// fields
		myClass.addField(
			new Field(Visibility.Public, 'Order', DataTypes.Integer, {
				value: 'int.MaxValue',
				additionalNewLine: true,
				hasGetterAndSetter: false,
				isConstant: false,
				isReadonly: false,
				isProperty: true
			}),
			false
		);

		// configure method
		const configureMethod = new Method(Visibility.Public, 'Configure', {
			async: false,
			returnType: 'void',
			override: false
		});
		myClass.methods.push(configureMethod);
		configureMethod.parameters.push(new Parameter('IApplicationBuilder', 'application'));

		// configure services method
		const configureServicesMethod = new Method(Visibility.Public, 'ConfigureServices', {
			async: false,
			returnType: 'void',
			override: false
		});
		myClass.methods.push(configureServicesMethod);

		configureServicesMethod.parameters.push(new Parameter('IServiceCollection', 'services'));
		configureServicesMethod.parameters.push(new Parameter('IConfiguration', 'configuration'));

		config.services.serviceClasses.forEach((service) => {
			configureServicesMethod.expressions.push(
				`services.AddScoped<${service.interfaceName || getDefaultInterfaceName(service.name)}, ${service.name}>();`
			);
		});

		return myClass.toString();
	}
}
