import Class from '$lib/csharp/base/Class';
import Field from '$lib/csharp/base/Field';
import Method from '$lib/csharp/base/Method';
import { Using } from '$lib/csharp/base/Using';
import { Visibility } from '$lib/csharp/base/Visibility';
import type PluginConfig from '../common/configs/PluginConfig';
import { File } from '../common/File';

export default class CSharpFileGenerator {
	static generateBasePluginClass(config: PluginConfig): File {
		const className = config.base.pluginName + 'Plugin';
		return new File(className, 'cs', [], this.generateBasePluginClassContent(config, className));
	}

	protected static generateBasePluginClassContent(config: PluginConfig, className: string): string {
		const pluginClass = new Class(config.base.nameSpace, className);

		// inherit from base plugin
		pluginClass.usings.push(new Using('Nop.Services.Plugins'));
		pluginClass.usings.push(new Using('System.Threading.Tasks'));
		pluginClass.inheritsFrom = 'BasePlugin';

		this.generateConfigurationPageUrl(config, pluginClass);
		this.generateInstallMethod(pluginClass);
		this.generateUninstallMethod(pluginClass);

		return pluginClass.toString();
	}

	protected static generateUninstallMethod(pluginClass: Class): void {
		const uninstallAsync = new Method(Visibility.Public, 'UninstallAsync', true);
		pluginClass.methods.push(uninstallAsync);

		uninstallAsync.expressions.push(`await base.UninstallAsync();`);
	}

	protected static generateInstallMethod(pluginClass: Class): void {
		const installAsync = new Method(Visibility.Public, 'InstallAsync', true);
		pluginClass.methods.push(installAsync);

		installAsync.expressions.push(`await base.InstallAsync();`);
	}

	protected static generateConfigurationPageUrl(config: PluginConfig, pluginClass: Class): void {
		pluginClass.usings.push(new Using('Nop.Core'));
		pluginClass.addField(new Field(Visibility.Private, 'webHelper', 'IWebHelper'));

		const getConfigurationPageUrl = new Method(
			Visibility.Public,
			'GetConfigurationPageUrl',
			true,
			false,
			'string'
		);
		pluginClass.methods.push(getConfigurationPageUrl);

		getConfigurationPageUrl.expressions.push(
			`return $"{_webHelper.GetStoreLocation()}Admin/${config.base.pluginName}/Configure";`
		);
	}
}
