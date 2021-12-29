import type PluginBaseConfig from './configs/PluginBaseConfig';

export function generateDllFileName(config: PluginBaseConfig): string {
	return config.nameSpace + '.dll';
}
