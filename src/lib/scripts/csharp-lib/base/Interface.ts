import ClassBase from './ClassBase';
import type ClassBaseOptions from './ClassBaseOptions';

export default class Record extends ClassBase {
	constructor(namespace: string, name: string, options: ClassBaseOptions) {
		super('interface', namespace, name, options);
	}
}
