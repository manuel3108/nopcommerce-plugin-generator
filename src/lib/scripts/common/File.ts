export class File {
	private name: string;
	readonly extension: string;
	public content: string;
	private path: string[];
	public id: number;

	constructor(name: string, extension: string, path: string[], content: string) {
		this.name = name;
		this.path = path;
		this.extension = extension;
		this.content = content;
	}

	get Path(): string[] {
		return this.path;
	}

	get fullName(): string {
		return this.name + '.' + this.extension;
	}
}
