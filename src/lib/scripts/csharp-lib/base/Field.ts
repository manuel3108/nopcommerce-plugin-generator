import { LineBreak } from '../../common/Defaults';
import { getIntend } from '../common/Helper';
import type FieldAttribute from './FieldAttribute';
import type { Visibility } from './Visibility';

interface FieldConfig {
	value?: string;
	isConstant: boolean;
	isReadonly: boolean;
	isProperty: boolean;
	hasGetterAndSetter: boolean;
	attribute?: FieldAttribute;
	additionalNewLine: boolean;
}

export default class Field {
	private readonly visibility: Visibility;
	readonly name: string;
	readonly type: string;
	readonly options: FieldConfig;

	constructor(visibility: Visibility, name: string, type: string, options: FieldConfig) {
		this.visibility = visibility;
		this.name = name;
		this.type = type;
		this.options = options;
	}

	public toString(baseIntend: number): string {
		let result = '';

		if (this.options.attribute) {
			result += getIntend(baseIntend) + this.options.attribute.toString() + LineBreak;
		}

		result += `${getIntend(baseIntend)}${this.visibility}`;

		if (this.options.isConstant) {
			result += ' const';
		}

		if (this.options.isReadonly) {
			result += ' readonly';
		}

		result += ` ${this.type} ${this.name}`;

		if (this.options.value) {
			if (this.options.isProperty) result += ' => ';
			else result += ' = ';

			result += this.options.value;
		}

		if (this.options.hasGetterAndSetter) {
			result += ` { get; set; }`;
		} else {
			result += ';';
		}

		if (this.options.additionalNewLine) {
			result += LineBreak;
		}

		return result;
	}
}
