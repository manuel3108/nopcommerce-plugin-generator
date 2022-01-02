import type FieldAttribute from './FieldAttribute';

export default interface ClassBaseOptions {
	addRegions: boolean;
	addCtor: boolean;
	attributes?: FieldAttribute[];
}
