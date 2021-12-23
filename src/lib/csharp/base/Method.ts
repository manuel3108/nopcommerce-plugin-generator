import { getIntend } from '../common/Helper';
import { Parameter } from './Parameter';
import type { Visibility } from './Visibility';

export default class Method {
	private visibility: Visibility;
	private name: string;
	private parameters: Parameter[];

	constructor(visibility: Visibility, name: string) {
		this.visibility = visibility;
		this.name = name;
		this.parameters = [];

		this.parameters.push(new Parameter('string', 'name'));
		this.parameters.push(new Parameter('MyComplexType', 'asd'));
	}

	public toString(baseIntend: number): string {
		return `${getIntend(baseIntend)}${this.visibility} ${this.name}(${this.parameters
			.map((parameter) => parameter.toString())
			.join(', ')}) {
${getIntend(baseIntend)}}`;
	}
}
