export class Service {
	name: string;
	interfaceName: string;

	constructor(name: string, interfaceName: string) {
		this.name = name;
		this.interfaceName = interfaceName;
	}
}

export default class PluginServicesConfig {
	serviceClasses: Service[];

	constructor() {
		this.serviceClasses = [];
	}
}
