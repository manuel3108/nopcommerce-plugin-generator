import { File } from '$lib/scripts/common/File';
import type PluginConfig from '$lib/scripts/configs/PluginConfig';
import type { DatabaseEntity } from '$lib/scripts/configs/PluginDatabaseConfig';
import Class from '$lib/scripts/csharp-lib/base/Class';
import Field from '$lib/scripts/csharp-lib/base/Field';
import { Using } from '$lib/scripts/csharp-lib/base/Using';
import { Visibility } from '$lib/scripts/csharp-lib/base/Visibility';
import { generateClassNamespace } from '$lib/scripts/csharp-lib/common/Helper';
import type IFileGenerator from '../../IFileGenerator';

export default class DatabaseEntityGenerator implements IFileGenerator {
	generate(config: PluginConfig): File[] {
		const files: File[] = [];
		const path = ['Domain'];

		for (const entity of config.database.entities) {
			const file = new File(entity.className, 'cs', path, this.generateEntityContent(entity, path, config));
			files.push(file);
		}

		return files;
	}

	protected generateEntityContent(entity: DatabaseEntity, path: string[], config: PluginConfig): string {
		const myClass = new Class(generateClassNamespace(config.base.nameSpace, path), entity.className, {
			addCtor: false,
			addRegions: false
		});

		myClass.inheritsFrom = 'BaseEntity';
		myClass.usings.push(new Using('Nop.Core'));

		entity.properties.forEach((property) => {
			myClass.addField(
				new Field(Visibility.Public, property.name, property.type, {
					additionalNewLine: false,
					hasGetterAndSetter: true,
					isConstant: false,
					isProperty: false,
					isReadonly: false
				}),
				false
			);
		});

		return myClass.toString();
	}
}
