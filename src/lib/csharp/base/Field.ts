import { FieldPrefix } from '../common/Defaults';
import { getIntend } from '../common/Helper';
import type { Visibility } from './Visibility';

export default class Field {
	private visibility: Visibility;
	name: string;
	type: string;

	constructor(visibility: Visibility, name: string, type: string) {
		this.visibility = visibility;
		this.name = name;
		this.type = type;
	}

	public toString(baseIntend: number): string {
		return `${getIntend(baseIntend)}${this.visibility} ${this.type} ${FieldPrefix + this.name};`;
	}
}
