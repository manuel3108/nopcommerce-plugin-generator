import Class from '$lib/scripts/csharp-lib/base/Class';
import Field from '$lib/scripts/csharp-lib/base/Field';
import Method from '$lib/scripts/csharp-lib/base/Method';
import { Using } from '$lib/scripts/csharp-lib/base/Using';
import { Visibility } from '$lib/scripts/csharp-lib/base/Visibility';
import { FieldPrefix } from '$lib/scripts/csharp-lib/common/Defaults';
import type PluginConfig from '$lib/scripts/configs/PluginConfig';
import { File } from '$lib/scripts/common/File';
import type IFileGenerator from '../../IFileGenerator';

export default class BasePluginGenerator implements IFileGenerator {
	generate(config: PluginConfig): File {
		const className = config.base.pluginName + 'Plugin';
		return new File(className, 'cs', [], this.generateBasePluginClassContent(config, className));
	}

	protected generateBasePluginClassContent(config: PluginConfig, className: string): string {
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

	protected generateBasePluginClassUninstallMethod(pluginClass: Class): void {
		const uninstallAsync = new Method(Visibility.Public, 'UninstallAsync', true);
		pluginClass.methods.push(uninstallAsync);

		uninstallAsync.expressions.push(`await base.UninstallAsync();`);
	}

	protected generateBasePluginClassInstallMethod(pluginClass: Class): void {
		const installAsync = new Method(Visibility.Public, 'InstallAsync', true);
		pluginClass.methods.push(installAsync);

		installAsync.expressions.push(`await base.InstallAsync();`);
	}

	protected generateBasePluginClassConfigurationPageUrl(config: PluginConfig, pluginClass: Class): void {
		pluginClass.usings.push(new Using('Nop.Core'));
		pluginClass.addField(new Field(Visibility.Private, FieldPrefix + 'webHelper', 'IWebHelper'));

		const getConfigurationPageUrl = new Method(Visibility.Public, 'GetConfigurationPageUrl', true, false, 'string');
		pluginClass.methods.push(getConfigurationPageUrl);

		getConfigurationPageUrl.expressions.push(`return $"{_webHelper.GetStoreLocation()}Admin/${config.base.pluginName}/Configure";`);
	}
}
