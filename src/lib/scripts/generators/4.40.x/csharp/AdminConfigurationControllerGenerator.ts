import { OverrideForStoreSuffix } from '$lib/scripts/common/Defaults';
import { File } from '$lib/scripts/common/File';
import type PluginConfig from '$lib/scripts/configs/PluginConfig';
import Class from '$lib/scripts/csharp-lib/base/Class';
import Field from '$lib/scripts/csharp-lib/base/Field';
import Method from '$lib/scripts/csharp-lib/base/Method';
import { Using } from '$lib/scripts/csharp-lib/base/Using';
import { Visibility } from '$lib/scripts/csharp-lib/base/Visibility';
import { generateClassNamespace, getIntend } from '$lib/scripts/csharp-lib/common/Helper';
import type IFileGenerator from '../../IFileGenerator';

export default class PluginSettingsGenerator implements IFileGenerator {
	generate(config: PluginConfig): File {
		const className = 'ConfigurationController';
		const path = ['Areas', 'Admin', 'Controllers'];
		return new File(className, 'cs', path, this.generateContent(config, className, path));
	}

	protected generateContent(config: PluginConfig, className: string, filePath: string[]): string {
		const settingsClass = new Class(generateClassNamespace(config.base.nameSpace, filePath), className, false, true);
		settingsClass.inheritsFrom = 'BaseController';

		settingsClass.usings.push(new Using('Nop.Web.Framework.Controllers'));
		settingsClass.usings.push(new Using('System.Threading.Tasks'));
		settingsClass.usings.push(new Using('Microsoft.AspNetCore.Mvc'));
		settingsClass.usings.push(new Using(config.base.nameSpace + '.Areas.Admin.Models'));

		this.generateConfigureGetMethod(config, settingsClass);

		return settingsClass.toString();
	}

	protected generateConfigureGetMethod(config: PluginConfig, settingsClass: Class): void {
		const method = new Method(Visibility.Public, 'Configure', false, true, 'Task<IActionResult>');
		settingsClass.methods.push(method);

		settingsClass.addField(
			new Field(Visibility.Private, '_settingService', 'ISettingService', {
				hasGetterAndSetter: false,
				isConstant: false,
				additionalNewLine: false,
				isReadonly: true
			})
		);
		settingsClass.usings.push(new Using('Nop.Services.Configuration'));

		settingsClass.addField(
			new Field(Visibility.Private, '_storeContext', 'IStoreContext', {
				hasGetterAndSetter: false,
				isConstant: false,
				additionalNewLine: false,
				isReadonly: true
			})
		);
		settingsClass.usings.push(new Using('Nop.Core'));

		method.expressions.push('var storeScope = await _storeContext.GetActiveStoreScopeConfigurationAsync();');
		method.expressions.push('var settings = await _settingService.LoadSettingAsync<' + config.base.pluginName + 'Settings>(storeScope);');

		// create and fill model
		method.expressions.push(''); // spacer
		method.expressions.push('var model = new ConfigurationModel');
		method.expressions.push('{');
		method.expressions.push(getIntend(1) + 'ActiveStoreScopeConfiguration = storeScope,');
		config.settings.properties.forEach((property) => {
			method.expressions.push(getIntend(1) + property.name + ' = settings.' + property.name + ',');
		});
		method.expressions.push('};');

		// check for store overrides
		method.expressions.push(''); // spacer
		method.expressions.push('if (storeScope > 0)');
		method.expressions.push('{');
		config.settings.properties.forEach((property) => {
			method.expressions.push(
				getIntend(1) +
					'model.' +
					property.name +
					OverrideForStoreSuffix +
					' = await _settingService.SettingExistsAsync(settings, settings => settings.' +
					property.name +
					', storeScope);'
			);
		});
		method.expressions.push('}');

		method.expressions.push(''); // spacer
		method.expressions.push('return View("~/Plugins/' + config.details.systemName + '/Areas/Admin/Views/Configuration.cshtml", model);');
	}
}
