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
		const className = 'DependencyRegistrar';
		const path = ['Infrastructure'];
		return [new File(className, 'cs', path, this.generatesContent(config, className, path))];
	}

	protected generatesContent(config: PluginConfig, className: string, path: string[]): string {
		const myClass = new Class(generateClassNamespace(config.base.nameSpace, path), className, {
			addCtor: false,
			addRegions: false
		});

		// inheritance
		myClass.inheritsFrom = 'IDependencyRegistrar';

		// usings
		myClass.usings.push(new Using('Nop.Core.Infrastructure.DependencyManagement'));
		myClass.usings.push(new Using('Microsoft.Extensions.DependencyInjection'));
		myClass.usings.push(new Using('Nop.Core.Infrastructure'));
		myClass.usings.push(new Using('Nop.Core.Configuration'));
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

		// method
		const method = new Method(Visibility.Public, 'Register', {
			async: false,
			returnType: 'void',
			override: false
		});
		myClass.methods.push(method);

		method.parameters.push(new Parameter('IServiceCollection', 'services'));
		method.parameters.push(new Parameter('ITypeFinder', 'typeFinder'));
		method.parameters.push(new Parameter('AppSettings', 'appSettings'));

		config.services.serviceClasses.forEach((service) => {
			method.expressions.push(`services.AddScoped<${service.interfaceName || getDefaultInterfaceName(service.name)}, ${service.name}>();`);
		});

		return myClass.toString();
	}
}
