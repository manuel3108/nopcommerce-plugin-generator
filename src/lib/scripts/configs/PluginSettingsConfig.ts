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
	}

	enabled: boolean;
}
