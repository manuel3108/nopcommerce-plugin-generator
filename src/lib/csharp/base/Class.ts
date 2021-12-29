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
	methods: Method[];
	usings: Using[];
	inheritsFrom: string;

	constructor(namespace: string, name: string) {
		this.namespace = namespace;
		this.name = name;

		this.myConstructor = new Method(Visibility.Public, name, false, false, null);
		this.usings = [];
		this.methods = [];
		this.fields = [];

		this.usings.push(new Using('System'));
	}

	public addField(field: Field): void {
		this.fields.push(field);

		this.myConstructor.parameters.push(new Parameter(field.type, field.name));
		this.myConstructor.expressions.push(`this.${FieldPrefix + field.name} = ${field.name};`);
	}

	public toString(): string {
		const baseIntend = 1;
		return `${this.usings.map((using) => using.toString()).join(LineBreak)}

namespace ${this.namespace} {
${getIntend(baseIntend)}public class ${this.name} ${
			this.inheritsFrom ? `: ${this.inheritsFrom}` : ''
		} {

${getIntend(baseIntend + 1)}#region Fields

${this.fields.map((field) => field.toString(baseIntend + 1)).join(LineBreak)}

${getIntend(baseIntend + 1)}#endregion

${getIntend(baseIntend + 1)}#region Ctor

${this.myConstructor.toString(baseIntend + 1)}

${getIntend(baseIntend + 1)}#endregion

${getIntend(baseIntend + 1)}#region Methods

${this.methods.map((method) => method.toString(baseIntend + 1)).join(LineBreak + LineBreak)}

${getIntend(baseIntend + 1)}#endregion
${getIntend(baseIntend)}}
}`;
	}
}
