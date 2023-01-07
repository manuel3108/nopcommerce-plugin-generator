import { LineBreak } from '$lib/scripts/common/Defaults';
import { File } from '$lib/scripts/common/File';
import type PluginConfig from '$lib/scripts/configs/PluginConfig';
import Class from '$lib/scripts/csharp-lib/base/Class';
import Field from '$lib/scripts/csharp-lib/base/Field';
import { Using } from '$lib/scripts/csharp-lib/base/Using';
import { Visibility } from '$lib/scripts/csharp-lib/base/Visibility';
import { generateClassNamespace, getIntend } from '$lib/scripts/csharp-lib/common/Helper';
import type IFileGenerator from '../../IFileGenerator';

export default class NameCompatibilityGenerator implements IFileGenerator {
	generate(config: PluginConfig): File[] {
		const files: File[] = [];
		const path = ['Mapping'];
		const className = 'NameCompatibility';

		const file = new File(className, 'cs', path, this.generateContent(config, path, className));
		files.push(file);

		return files;
	}

	protected generateContent(config: PluginConfig, path: string[], className: string): string {
		const myClass = new Class(generateClassNamespace(config.base.nameSpace, path), className, {
			addCtor: false,
			addRegions: false
		});
		myClass.inheritsFrom = "INameCompatibility";

		myClass.usings.push(new Using('Nop.Data.Mapping'));
		myClass.usings.push(new Using('System.Collections.Generic'));
		myClass.usings.push(new Using(config.base.nameSpace + '.Domain'));

		myClass.addField(
			new Field(Visibility.Public, 'TableNames', 'Dictionary<Type, string>', {
				additionalNewLine: true,
				hasGetterAndSetter: false,
				isProperty: true,
				isConstant: false,
				isReadonly: false,
				value: `new Dictionary<Type, string>
${getIntend(2)}{
${config.database.entities
	.map((entity) => `${getIntend(3)}{ typeof(${entity.className}), "${entity.tableName || entity.className}" }`)
	.join(',' + LineBreak)}
${getIntend(2)}}`
			}),
			false
		);

		myClass.addField(
			new Field(Visibility.Public, 'ColumnName', 'Dictionary<(Type, string), string>', {
				additionalNewLine: false,
				hasGetterAndSetter: false,
				isProperty: true,
				isConstant: false,
				isReadonly: false,
				value: `new Dictionary<(Type, string), string>()`
			}),
			false
		);

		return myClass.toString();
	}
}
