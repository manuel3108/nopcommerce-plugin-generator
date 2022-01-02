import { LineBreak } from '../../common/Defaults';
import { getIntend } from '../common/Helper';
import type FieldAttribute from './FieldAttribute';
import type { Parameter } from './Parameter';
import type { Visibility } from './Visibility';

export interface MethodOptions {
	override: boolean;
	async: boolean;
	returnType: string;
	attribute?: FieldAttribute;
}

export default class Method {
	private visibility: Visibility;
	private name: string;
	private options: MethodOptions;
	parameters: Parameter[];
	expressions: string[];

	constructor(visibility: Visibility, name: string, options: MethodOptions) {
		this.visibility = visibility;
		this.name = name;
		this.parameters = [];
		this.options = options;

		this.expressions = [];
	}

	public toString(baseIntend: number): string {
		let result = '';

		// attribute
		if (this.options.attribute) {
			result += getIntend(baseIntend) + this.options.attribute.toString() + LineBreak;
		}

		// visibility
		result += `${getIntend(baseIntend)}${this.visibility}`;

		// override
		if (this.options.override) {
			result += ' override';
		}

		// async
		if (this.options.async) {
			result += ' async';
		}

		// return type
		if (this.options.returnType) {
			result += ` ${this.options.returnType}`;
		}

		// method name
		result += ` ${this.name}`;

		// parameters
		result += '(';
		if (this.parameters.length > 0) {
			result += this.parameters.map((parameter) => parameter.toString()).join(', ');
		}
		result += ')';

		result += LineBreak + getIntend(baseIntend) + '{' + LineBreak;

		// method content
		if (this.expressions.length > 0) {
			result += this.expressions.map((expression) => getIntend(baseIntend + 1) + expression).join(LineBreak);
		}

		result += LineBreak + getIntend(baseIntend) + '}';

		return result;
	}
}
