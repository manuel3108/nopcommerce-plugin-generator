import ClassBase from './ClassBase';
import type ClassBaseOptions from './ClassBaseOptions';

export default class Class extends ClassBase {
	constructor(namespace: string, name: string, options: ClassBaseOptions) {
		super('class', namespace, name, options);
	}
}
