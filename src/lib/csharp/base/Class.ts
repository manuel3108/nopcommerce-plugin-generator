import { LineBreak } from '../common/Defaults';
import { getIntend } from '../common/Helper';
import Method from './Method';
import { Using } from './Using';
import { Visibility } from './Visibility';

export default class Class {
	private namespace: string;
	private name: string;
	private myConstructor: Method;
	private methods: Method[];
	private usings: Using[];

	constructor(namespace: string, name: string) {
		this.namespace = namespace;
		this.name = name;

		this.myConstructor = new Method(Visibility.Public, name);
		this.usings = [];
		this.methods = [];

		this.usings.push(new Using('System'));
	}

	public toString(): string {
		const baseIntend = 1;
		return `${this.usings.map((using) => using.toString()).join(LineBreak)}

namespace ${this.namespace} {
${getIntend(baseIntend)}public class ${this.name} {

${getIntend(baseIntend + 1)}#region Fields

${getIntend(baseIntend + 1)}#endregion

${getIntend(baseIntend + 1)}#region Ctor

${this.myConstructor.toString(baseIntend + 1)}

${getIntend(baseIntend + 1)}#endregion

${getIntend(baseIntend + 1)}#region Methods

${this.methods.map((method) => method.toString(baseIntend + 1)).join(LineBreak)}

${getIntend(baseIntend + 1)}#endregion
${getIntend(baseIntend)}}
}`;
	}
}
