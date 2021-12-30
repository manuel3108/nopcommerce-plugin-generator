import { FieldPrefix, LineBreak } from '../common/Defaults';
import { getIntend } from '../common/Helper';
import type Field from './Field';
import Method from './Method';
import { Parameter } from './Parameter';
import { Using } from './Using';
import { Visibility } from './Visibility';

export default class Class {
	private namespace: string;
	private name: string;
	private myConstructor: Method;
	private fields: Field[] = [];
	private addRegions: boolean;
	methods: Method[];
	usings: Using[];
	inheritsFrom: string;

	constructor(namespace: string, name: string, addRegions = true, addCtor = true) {
		this.namespace = namespace;
		this.name = name;
		this.addRegions = addRegions;

		this.usings = [];
		this.methods = [];
		this.fields = [];

		if (addCtor) {
			this.myConstructor = new Method(Visibility.Public, name, false, false, null);
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
		result += `namespace ${this.namespace} {${LineBreak}`;
		result += `${getIntend(baseIntend)}public class ${this.name} ${this.inheritsFrom ? `: ${this.inheritsFrom}` : ''} {${LineBreak}`;

		// fields
		if (this.addRegions) result += `${LineBreak}${getIntend(baseIntend + 1)}#region Fields${LineBreak}${LineBreak}`;
		result += this.fields.map((field) => field.toString(baseIntend + 1)).join(LineBreak) + LineBreak;
		if (this.addRegions) result += `${LineBreak}${getIntend(baseIntend + 1)}#endregion${LineBreak}`;

		// constructor
		if (this.myConstructor) {
			if (this.addRegions) result += `${LineBreak}${getIntend(baseIntend + 1)}#region Ctor${LineBreak}${LineBreak}`;
			result += this.myConstructor.toString(baseIntend + 1) + LineBreak + LineBreak;
			if (this.addRegions) result += `${getIntend(baseIntend + 1)}#endregion${LineBreak}`;
		}

		// methods
		if (this.addRegions) result += `${LineBreak}${getIntend(baseIntend + 1)}#region Methods${LineBreak}${LineBreak}`;
		result += this.methods.map((method) => method.toString(baseIntend + 1)).join(LineBreak + LineBreak);
		if (this.addRegions) result += `${LineBreak}${LineBreak}${getIntend(baseIntend + 1)}#endregion${LineBreak}`;

		// footer
		result += `${getIntend(baseIntend)}}${LineBreak}`;
		result += `}${LineBreak}`;

		return result;
	}
}
