import { DataTypes } from '../common/DataTypes';

export class SettingProperty {
	readonly name: string;
	readonly type: string;

	constructor(name: string, type: string) {
		this.name = name;
		this.type = type;
	}
}

export default class PluginSettingsConfig {
	properties: SettingProperty[];

	constructor() {
		this.properties = [];

		// add default property
		this.properties.push(new SettingProperty('', DataTypes.Integer));
	}

	enabled: boolean;
}
