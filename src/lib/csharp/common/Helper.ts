import { Intend } from './Defaults';

export function getIntend(intend: number): string {
	let intendString = '';
	for (let i = 0; i < intend; i++) {
		intendString += Intend;
	}
	return intendString;
}
