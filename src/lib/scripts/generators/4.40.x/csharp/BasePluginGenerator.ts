import Class from '$lib/scripts/csharp-lib/base/Class';
import Field from '$lib/scripts/csharp-lib/base/Field';
import Method from '$lib/scripts/csharp-lib/base/Method';
import { Using } from '$lib/scripts/csharp-lib/base/Using';
import { Visibility } from '$lib/scripts/csharp-lib/base/Visibility';
import { FieldPrefix } from '$lib/scripts/common/Defaults';
import type PluginConfig from '$lib/scripts/configs/PluginConfig';
import { File } from '$lib/scripts/common/File';
import type IFileGenerator from '../../IFileGenerator';
import { getLanguageResource } from '../../LanguageResourceSingleton';
import { getIntend } from '$lib/scripts/csharp-lib/common/Helper';

export default class BasePluginGenerator implements IFileGenerator {
	generate(config: PluginConfig): File {
		const className = config.base.pluginName + 'Plugin';
		return new File(className, 'cs', [], this.generateBasePluginClassContent(config, className));
	}

	protected generateBasePluginClassContent(config: PluginConfig, className: string): string {
		const pluginClass = new Class(config.base.nameSpace, className);

		pluginClass.usings.push(new Using('Nop.Services.Plugins'));
		pluginClass.usings.push(new Using('System.Threading.Tasks'));

		if (config.settings.enabled) {
			pluginClass.usings.push(new Using('Nop.Services.Localization'));
			pluginClass.usings.push(new Using('Nop.Services.Configuration'));
		}

		// inherit from base plugin
		pluginClass.inheritsFrom = 'BasePlugin';

		this.generateBasePluginClassConfigurationPageUrl(config, pluginClass);
		this.generateBasePluginClassInstallMethod(config, pluginClass);
		this.generateBasePluginClassUninstallMethod(pluginClass);

		return pluginClass.toString();
	}

	protected generateBasePluginClassUninstallMethod(pluginClass: Class): void {
		const uninstallAsync = new Method(Visibility.Public, 'UninstallAsync', true);
		pluginClass.methods.push(uninstallAsync);

		uninstallAsync.expressions.push(`await base.UninstallAsync();`);
	}

	protected generateBasePluginClassInstallMethod(config: PluginConfig, pluginClass: Class): void {
		const installAsync = new Method(Visibility.Public, 'InstallAsync', true);
		pluginClass.methods.push(installAsync);

		if (config.settings.enabled) {
			this.addLocalResources(installAsync, pluginClass);
			this.initializeDefaultSettings(installAsync, config, pluginClass);
		}

		installAsync.expressions.push(''); // spacer
		installAsync.expressions.push(`await base.InstallAsync();`);
	}

	protected initializeDefaultSettings(installAsync: Method, config: PluginConfig, pluginClass: Class): void {
		installAsync.expressions.push(''); // spacer
		installAsync.expressions.push(`await _settingService.SaveSettingAsync(new ${config.base.pluginName}Settings()`);
		installAsync.expressions.push('{');
		installAsync.expressions.push(`${getIntend(1)}// todo: set default values of settings here`);
		installAsync.expressions.push('});');

		pluginClass.addField(
			new Field(Visibility.Private, FieldPrefix + 'settingService', 'ISettingService', {
				hasGetterAndSetter: false,
				isConstant: false,
				isReadonly: true,
				additionalNewLine: false
			})
		);
	}

	protected addLocalResources(method: Method, pluginClass: Class): void {
		pluginClass.usings.push(new Using('System.Collections.Generic'));
		method.expressions.push(`await _localizationService.AddLocaleResourceAsync(new Dictionary<string, string>`);
		method.expressions.push('{');
		getLanguageResource().forEach((resource) => {
			method.expressions.push(`${getIntend(1)}["${resource.name}"] = "${resource.value}",`);
		});
		method.expressions.push('});');

		pluginClass.addField(
			new Field(Visibility.Private, FieldPrefix + 'localizationService', 'ILocalizationService', {
				hasGetterAndSetter: false,
				isConstant: false,
				isReadonly: true,
				additionalNewLine: false
			})
		);
	}

	protected generateBasePluginClassConfigurationPageUrl(config: PluginConfig, pluginClass: Class): void {
		pluginClass.usings.push(new Using('Nop.Core'));
		pluginClass.addField(
			new Field(Visibility.Private, FieldPrefix + 'webHelper', 'IWebHelper', {
				hasGetterAndSetter: false,
				isConstant: false,
				isReadonly: true,
				additionalNewLine: false
			})
		);

		const getConfigurationPageUrl = new Method(Visibility.Public, 'GetConfigurationPageUrl', true, false, 'string');
		pluginClass.methods.push(getConfigurationPageUrl);

		getConfigurationPageUrl.expressions.push(`return $"{_webHelper.GetStoreLocation()}Admin/${config.base.pluginName}/Configure";`);
	}
}
