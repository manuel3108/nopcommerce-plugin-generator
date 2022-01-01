import { Intend } from '$lib/scripts/common/Defaults';

export function getIntend(intend: number): string {
	let intendString = '';
	for (let i = 0; i < intend; i++) {
		intendString += Intend;
	}
	return intendString;
}

export function generateClassNamespace(baseNamespace: string, path: string[]) {
	let result = baseNamespace;
	path.forEach((item) => {
		result += '.' + item;
	});
	return result;
}
