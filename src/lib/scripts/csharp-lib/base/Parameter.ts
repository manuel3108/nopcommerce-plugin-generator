export class Parameter {
	private type: string;
	private name: string;

	constructor(type: string, name: string) {
		this.type = type;
		this.name = name;
	}

	public toString(): string {
		return `${this.type} ${this.name}`;
	}
}
