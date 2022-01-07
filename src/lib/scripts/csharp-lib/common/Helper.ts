import { Intend } from '$lib/scripts/common/Defaults';

export function getIntend(intend: number): string {
	let intendString = '';
	for (let i = 0; i < intend; i++) {
		intendString += Intend;
	}
	return intendString;
}

export function generateClassNamespace(baseNamespace: string, path: string[]) {
	return baseNamespace + '.' + path.join('.');
}

export function convertPathToString(path: string[]): string {
	return path.join('\\');
}

export function getDefaultInterfaceName(className: string): string {
	return 'I' + className;
}
