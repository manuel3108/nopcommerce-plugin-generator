import ClassBase from './ClassBase';

export default class Class extends ClassBase {
	constructor(namespace: string, name: string, addRegions = true, addCtor = true) {
		super('class', namespace, name, addRegions, addCtor);
	}
}
