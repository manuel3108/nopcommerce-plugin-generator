export class LanguageResource {
	readonly value: string;
	readonly name: string;

	constructor(name: string, value: string) {
		this.name = name;
		this.value = value;
	}
}

class LanguageResourceSingleton {
	private static _instance: LanguageResourceSingleton;
	languageResources: LanguageResource[];

	private constructor() {
		this.languageResources = [];
	}

	public static get Instance() {
		return this._instance || (this._instance = new this());
	}
}

export function addLanguageResource(name: string, value: string) {
	LanguageResourceSingleton.Instance.languageResources.push(new LanguageResource(name, value));
}

export function getLanguageResource(): LanguageResource[] {
	return LanguageResourceSingleton.Instance.languageResources;
}

export function clearLanguageResource() {
	LanguageResourceSingleton.Instance.languageResources = [];
}
