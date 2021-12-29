import PluginBaseConfig from './PluginBaseConfig';
import PluginDetailsConfig from './PluginDetailsConfig';

export default class PluginConfig {
	base: PluginBaseConfig;
	details: PluginDetailsConfig;

	constructor() {
		this.base = new PluginBaseConfig();
		this.details = new PluginDetailsConfig();
	}
}
