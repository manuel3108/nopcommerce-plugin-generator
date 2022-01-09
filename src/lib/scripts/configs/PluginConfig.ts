import PluginBaseConfig from './PluginBaseConfig';
import PluginDatabaseConfig from './PluginDatabaseConfig';
import PluginDetailsConfig from './PluginDetailsConfig';
import PluginServicesConfig from './PluginServicesConfig';
import PluginSettingsConfig from './PluginSettingsConfig';

export default class PluginConfig {
	base: PluginBaseConfig;
	details: PluginDetailsConfig;
	settings: PluginSettingsConfig;
	services: PluginServicesConfig;
	database: PluginDatabaseConfig;

	constructor() {
		this.base = new PluginBaseConfig();
		this.details = new PluginDetailsConfig();
		this.settings = new PluginSettingsConfig();
		this.services = new PluginServicesConfig();
		this.database = new PluginDatabaseConfig();
	}
}
