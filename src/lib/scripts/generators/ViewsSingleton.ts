import { convertPathToString } from '../csharp-lib/common/Helper';

export class View {
	private readonly path: string;
	private readonly name: string;
	private readonly extension: string;

	constructor(patch: string, name: string, extension: string) {
		this.path = patch;
		this.name = name;
		this.extension = extension;
	}

	public get fullPath(): string {
		return this.path + '\\' + this.name + '.' + this.extension;
	}
}

class ViewsSingleton {
	private static _instance: ViewsSingleton;
	views: View[];

	private constructor() {
		this.views = [];
	}

	public static get Instance() {
		return this._instance || (this._instance = new this());
	}
}

export function addView(path: string[], name: string, extension: string) {
	ViewsSingleton.Instance.views.push(new View(convertPathToString(path), name, extension));
}

export function getViews(): View[] {
	return ViewsSingleton.Instance.views;
}

export function clearViews() {
	ViewsSingleton.Instance.views = [];
}
