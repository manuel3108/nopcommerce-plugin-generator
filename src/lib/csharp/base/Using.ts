export class Using {
	private name: string;

	constructor(name: string) {
		this.name = name;
	}

	public toString(): string {
		return `using ${this.name};`;
	}
}
