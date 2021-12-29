import Class from '$lib/csharp/base/Class';
import Field from '$lib/csharp/base/Field';
import Method from '$lib/csharp/base/Method';
import { Using } from '$lib/csharp/base/Using';
import { Visibility } from '$lib/csharp/base/Visibility';
import { FieldPrefix } from '$lib/csharp/common/Defaults';
import type PluginConfig from '../common/configs/PluginConfig';
import { File } from '../common/File';

export default class CSharpFileGenerator {
	static generateBasePluginClass(config: PluginConfig): File {
		const className = config.base.pluginName + 'Plugin';
		return new File(className, 'cs', [], this.generateBasePluginClassContent(config, className));
	}

	static generatePluginDefaultsClass(config: PluginConfig): File {
		const className = config.base.pluginName + 'Defaults';
		return new File(className, 'cs', [], this.generatePluginDefaultsClassContent(config, className));
	}

	protected static generatePluginDefaultsClassContent(config: PluginConfig, className: string): string {
		const defaultsClass = new Class(config.base.nameSpace, className, false, false);

		defaultsClass.addField(new Field(Visibility.Public, 'SystemName', 'string', `"${config.details.systemName}"`, true, false), false);

		return defaultsClass.toString();
	}

	protected static generateBasePluginClassContent(config: PluginConfig, className: string): string {
		const pluginClass = new Class(config.base.nameSpace, className);

		// inherit from base plugin
		pluginClass.usings.push(new Using('Nop.Services.Plugins'));
		pluginClass.usings.push(new Using('System.Threading.Tasks'));
		pluginClass.inheritsFrom = 'BasePlugin';

		this.generateBasePluginClassConfigurationPageUrl(config, pluginClass);
		this.generateBasePluginClassInstallMethod(pluginClass);
		this.generateBasePluginClassUninstallMethod(pluginClass);

		return pluginClass.toString();
	}

	protected static generateBasePluginClassUninstallMethod(pluginClass: Class): void {
		const uninstallAsync = new Method(Visibility.Public, 'UninstallAsync', true);
		pluginClass.methods.push(uninstallAsync);

		uninstallAsync.expressions.push(`await base.UninstallAsync();`);
	}

	protected static generateBasePluginClassInstallMethod(pluginClass: Class): void {
		const installAsync = new Method(Visibility.Public, 'InstallAsync', true);
		pluginClass.methods.push(installAsync);

		installAsync.expressions.push(`await base.InstallAsync();`);
	}

	protected static generateBasePluginClassConfigurationPageUrl(config: PluginConfig, pluginClass: Class): void {
		pluginClass.usings.push(new Using('Nop.Core'));
		pluginClass.addField(new Field(Visibility.Private, FieldPrefix + 'webHelper', 'IWebHelper'));

		const getConfigurationPageUrl = new Method(Visibility.Public, 'GetConfigurationPageUrl', true, false, 'string');
		pluginClass.methods.push(getConfigurationPageUrl);

		getConfigurationPageUrl.expressions.push(`return $"{_webHelper.GetStoreLocation()}Admin/${config.base.pluginName}/Configure";`);
	}
}
