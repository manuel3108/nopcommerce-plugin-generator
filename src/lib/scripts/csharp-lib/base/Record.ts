import ClassBase from './ClassBase';

export default class Record extends ClassBase {
	constructor(namespace: string, name: string, addRegions = true, addCtor = true) {
		super('record', namespace, name, addRegions, addCtor);
	}
}
