import type { SettingProperty } from './PluginSettingsConfig';

export class DatabaseEntity {
	className: string;
	tableName: string;
	properties: SettingProperty[];

	constructor(className: string, tableName: string) {
		this.className = className;
		this.tableName = tableName;
		this.properties = [];
	}
}

export default class PluginDatabaseConfig {
	entities: DatabaseEntity[];

	constructor() {
		this.entities = [];
	}
}
