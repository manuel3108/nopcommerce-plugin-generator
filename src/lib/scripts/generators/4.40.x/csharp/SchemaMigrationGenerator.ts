import { File } from '$lib/scripts/common/File';
import type PluginConfig from '$lib/scripts/configs/PluginConfig';
import Class from '$lib/scripts/csharp-lib/base/Class';
import Field from '$lib/scripts/csharp-lib/base/Field';
import FieldAttribute from '$lib/scripts/csharp-lib/base/FieldAttribute';
import Method from '$lib/scripts/csharp-lib/base/Method';
import { Using } from '$lib/scripts/csharp-lib/base/Using';
import { Visibility } from '$lib/scripts/csharp-lib/base/Visibility';
import { generateClassNamespace } from '$lib/scripts/csharp-lib/common/Helper';
import type IFileGenerator from '../../IFileGenerator';
import { DateTime } from 'luxon';

export default class SchemaMigrationGenerator implements IFileGenerator {
	generate(config: PluginConfig): File[] {
		const files: File[] = [];
		const path = ['Migrations'];
		const className = 'SchemaMigration';

		const file = new File(className, 'cs', path, this.generateContent(config, path, className));
		files.push(file);

		return files;
	}

	protected generateContent(config: PluginConfig, path: string[], className: string): string {
		const date = DateTime.now().toFormat('yyyy/MM/dd HH:mm:ss:SSS') + "0000";
		const myClass = new Class(generateClassNamespace(config.base.nameSpace, path), className, {
			addCtor: true,
			addRegions: true,
			attributes: [
				new FieldAttribute('SkipMigrationOnUpdate'),
				new FieldAttribute(`NopMigration("${date}", "${config.details.systemName} base schema")`)
			]
		});

		myClass.usings.push(new Using(config.base.nameSpace + '.Domain'));
		myClass.usings.push(new Using('Nop.Data.Migrations'));
		myClass.usings.push(new Using('FluentMigrator'));
		myClass.inheritsFrom = 'AutoReversingMigration';

		myClass.addField(
			new Field(Visibility.Private, '_migrationManager', 'IMigrationManager ', {
				additionalNewLine: false,
				hasGetterAndSetter: false,
				isConstant: false,
				isProperty: false,
				isReadonly: true
			})
		);

		const migrateUp = new Method(Visibility.Public, 'Up', {
			returnType: 'void',
			async: false,
			override: true
		});

		config.database.entities.forEach((entity) => {
			migrateUp.expressions.push(`_migrationManager.BuildTable<${entity.className}>(Create);`);
		});

		myClass.methods.push(migrateUp);

		return myClass.toString();
	}
}
