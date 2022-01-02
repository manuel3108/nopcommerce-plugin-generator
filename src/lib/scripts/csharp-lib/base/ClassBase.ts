import { FieldPrefix, LineBreak } from '../../common/Defaults';
import { getIntend } from '../common/Helper';
import type ClassBaseOptions from './ClassBaseOptions';
import type Field from './Field';
import Method from './Method';
import { Parameter } from './Parameter';
import { Using } from './Using';
import { Visibility } from './Visibility';

export default class ClassBase {
	private namespace: string;
	private name: string;
	private myConstructor: Method;
	private fields: Field[] = [];
	private options: ClassBaseOptions;
	methods: Method[];
	usings: Using[];
	inheritsFrom: string;
	type: string;

	constructor(type: string, namespace: string, name: string, options: ClassBaseOptions) {
		this.type = type;
		this.namespace = namespace;
		this.name = name;
		this.options = options;

		this.usings = [];
		this.methods = [];
		this.fields = [];

		if (this.options.addCtor) {
			this.myConstructor = new Method(Visibility.Public, name, {
				override: false,
				async: false,
				returnType: null
			});
		}

		this.usings.push(new Using('System'));
	}

	public addField(field: Field, addToCtor = true): void {
		this.fields.push(field);

		if (addToCtor) {
			const nameWithoutPrefix = field.name.replace(FieldPrefix, '');
			this.myConstructor.parameters.push(new Parameter(field.type, nameWithoutPrefix));
			this.myConstructor.expressions.push(`this.${field.name} = ${nameWithoutPrefix};`);
		}
	}

	public toString(): string {
		const baseIntend = 1;

		// header
		let result = `${this.usings.map((using) => using.toString()).join(LineBreak)}${LineBreak}${LineBreak}`;
		result += `namespace ${this.namespace}${LineBreak}`;
		result += `{${LineBreak}`;

		// attributes
		if (this.options.attributes) {
			result += this.options.attributes.map((attribute) => getIntend(1) + attribute.toString()).join(LineBreak) + LineBreak;
		}

		result += `${getIntend(baseIntend)}public ${this.type} ${this.name} ${this.inheritsFrom ? `: ${this.inheritsFrom}` : ''}${LineBreak}`;
		result += `${getIntend(baseIntend)}{${LineBreak}`;

		// fields
		if (this.options.addRegions) result += `${getIntend(baseIntend + 1)}#region Fields${LineBreak}${LineBreak}`;
		result += this.fields.map((field) => field.toString(baseIntend + 1)).join(LineBreak) + LineBreak;
		if (this.options.addRegions) result += LineBreak + `${getIntend(baseIntend + 1)}#endregion${LineBreak}`;

		// constructor
		if (this.myConstructor) {
			if (this.options.addRegions) result += `${LineBreak}${getIntend(baseIntend + 1)}#region Ctor${LineBreak}${LineBreak}`;
			result += this.myConstructor.toString(baseIntend + 1) + LineBreak + LineBreak;
			if (this.options.addRegions) result += `${getIntend(baseIntend + 1)}#endregion${LineBreak}`;
		}

		// methods
		if (this.options.addRegions) result += `${LineBreak}${getIntend(baseIntend + 1)}#region Methods${LineBreak}${LineBreak}`;
		if (this.methods.length > 0) result += this.methods.map((method) => method.toString(baseIntend + 1)).join(LineBreak + LineBreak) + LineBreak;
		if (this.options.addRegions) result += `${LineBreak}${getIntend(baseIntend + 1)}#endregion${LineBreak}`;

		// footer
		result += `${getIntend(baseIntend)}}${LineBreak}`;
		result += `}${LineBreak}`;

		return result;
	}
}
