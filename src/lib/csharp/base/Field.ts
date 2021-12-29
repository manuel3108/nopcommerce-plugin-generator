import { getIntend } from '../common/Helper';
import type { Visibility } from './Visibility';

export default class Field {
	private readonly visibility: Visibility;
	private readonly isConstant: boolean;
	private readonly isReadonly: boolean;
	readonly name: string;
	readonly type: string;
	readonly value: string;

	constructor(visibility: Visibility, name: string, type: string, value = '', isConstant = false, isReadonly = true) {
		this.visibility = visibility;
		this.name = name;
		this.type = type;
		this.value = value;
		this.isConstant = isConstant;
		this.isReadonly = isReadonly;
	}

	public toString(baseIntend: number): string {
		return `${getIntend(baseIntend)}${this.visibility}${this.isConstant ? ' const' : ''}${this.isReadonly ? ' readonly' : ''} ${this.type} ${
			this.name
		}${this.value ? ' = ' + this.value : ''};`;
	}
}
