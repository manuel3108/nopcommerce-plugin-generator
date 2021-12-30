import { getIntend } from '../common/Helper';
import type { Visibility } from './Visibility';

interface FieldConfig {
	value?: string;
	isConstant: boolean;
	isReadonly: boolean;
	hasGetterAndSetter: boolean;
}

export default class Field {
	private readonly visibility: Visibility;
	private readonly isConstant: boolean;
	private readonly isReadonly: boolean;
	private readonly hasGetterAndSetter: boolean;
	readonly name: string;
	readonly type: string;
	readonly value: string;

	constructor(visibility: Visibility, name: string, type: string, options: FieldConfig) {
		this.visibility = visibility;
		this.name = name;
		this.type = type;
		this.value = options.value;
		this.isConstant = options.isConstant;
		this.isReadonly = options.isReadonly;
		this.hasGetterAndSetter = options.hasGetterAndSetter;
	}

	public toString(baseIntend: number): string {
		return `${getIntend(baseIntend)}${this.visibility}${this.isConstant ? ' const' : ''}${this.isReadonly ? ' readonly' : ''} ${this.type} ${
			this.name
		}${this.value ? ' = ' + this.value : ''}${this.hasGetterAndSetter ? ' { get; set; }' : ';'}`;
	}
}
