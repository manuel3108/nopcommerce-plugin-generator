import { LineBreak } from '../common/Defaults';
import { getIntend } from '../common/Helper';
import type { Parameter } from './Parameter';
import type { Visibility } from './Visibility';

export default class Method {
	private visibility: Visibility;
	private name: string;
	private override: boolean;
	private async: boolean;
	private returnType: string;
	parameters: Parameter[];
	expressions: string[];

	constructor(
		visibility: Visibility,
		name: string,
		override = false,
		async = true,
		returnType = 'Task'
	) {
		this.visibility = visibility;
		this.name = name;
		this.parameters = [];
		this.override = override;
		this.async = async;
		this.returnType = returnType;

		this.expressions = [];
	}

	public toString(baseIntend: number): string {
		return `${getIntend(baseIntend)}${this.visibility}${this.override ? ' override' : ''}${
			this.async ? ' async' : ''
		}${this.returnType ? ' ' + this.returnType : ''} ${this.name}(${this.parameters
			.map((parameter) => parameter.toString())
			.join(', ')}) {
${this.expressions.map((expression) => `${getIntend(baseIntend + 1)}${expression}`).join(LineBreak)}
${getIntend(baseIntend)}}`;
	}
}
