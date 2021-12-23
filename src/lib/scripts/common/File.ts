export class File {
	private name: string;
	private extension: string;
	private content: string;
	private path: string[];

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
