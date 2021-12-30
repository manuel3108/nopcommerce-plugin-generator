import PluginBaseConfig from './PluginBaseConfig';
import PluginDetailsConfig from './PluginDetailsConfig';
import PluginSettingsConfig from './PluginSettingsConfig';

export default class PluginConfig {
	base: PluginBaseConfig;
	details: PluginDetailsConfig;
	settings: PluginSettingsConfig;

	constructor() {
		this.base = new PluginBaseConfig();
		this.details = new PluginDetailsConfig();
		this.settings = new PluginSettingsConfig();
	}
}
