import { OverrideForStoreSuffix } from '$lib/scripts/common/Defaults';
import { File } from '$lib/scripts/common/File';
import type PluginConfig from '$lib/scripts/configs/PluginConfig';
import Class from '$lib/scripts/csharp-lib/base/Class';
import Field from '$lib/scripts/csharp-lib/base/Field';
import FieldAttribute from '$lib/scripts/csharp-lib/base/FieldAttribute';
import Method from '$lib/scripts/csharp-lib/base/Method';
import { Parameter } from '$lib/scripts/csharp-lib/base/Parameter';
import { Using } from '$lib/scripts/csharp-lib/base/Using';
import { Visibility } from '$lib/scripts/csharp-lib/base/Visibility';
import { generateClassNamespace, getIntend } from '$lib/scripts/csharp-lib/common/Helper';
import type IFileGenerator from '../../IFileGenerator';

export default class PluginSettingsGenerator implements IFileGenerator {
	generate(config: PluginConfig): File[] {
		const className = config.base.pluginName + 'ConfigurationController';
		const path = ['Areas', 'Admin', 'Controllers'];
		return [new File(className, 'cs', path, this.generateContent(config, className, path))];
	}

	protected generateContent(config: PluginConfig, className: string, filePath: string[]): string {
		const settingsController = new Class(generateClassNamespace(config.base.nameSpace, filePath), className, {
			addCtor: true,
			addRegions: true,
			attributes: [new FieldAttribute('AuthorizeAdmin'), new FieldAttribute('Area(AreaNames.Admin)')]
		});
		settingsController.inheritsFrom = 'BaseController';

		settingsController.usings.push(new Using('Nop.Web.Framework.Controllers'));
		settingsController.usings.push(new Using('System.Threading.Tasks'));
		settingsController.usings.push(new Using('Microsoft.AspNetCore.Mvc'));
		settingsController.usings.push(new Using('Nop.Web.Framework.Mvc.Filters'));
		settingsController.usings.push(new Using('Nop.Web.Framework'));
		settingsController.usings.push(new Using(config.base.nameSpace + '.Areas.Admin.Models'));

		this.generateConfigureGetMethod(config, settingsController);
		this.generateConfigurePostMethod(config, settingsController);

		return settingsController.toString();
	}

	protected generateConfigurePostMethod(config: PluginConfig, settingsController: Class): void {
		const method = new Method(Visibility.Public, 'Configure', {
			override: false,
			async: true,
			returnType: 'Task<IActionResult>',
			attribute: new FieldAttribute('HttpPost')
		});
		method.parameters.push(new Parameter('ConfigurationModel', 'model'));

		settingsController.methods.push(method);

		// load settings
		method.expressions.push('var storeScope = await _storeContext.GetActiveStoreScopeConfigurationAsync();');
		method.expressions.push('var settings = await _settingService.LoadSettingAsync<' + config.base.pluginName + 'Settings>(storeScope);');

		// save settings into model
		method.expressions.push(''); // spacer
		config.settings.properties.forEach((property) => {
			method.expressions.push('settings.' + property.name + ' = model.' + property.name + ';');
		});

		// take care of overridden settings per store
		method.expressions.push(''); // spacer
		config.settings.properties.forEach((property) => {
			method.expressions.push(
				`await _settingService.SaveSettingOverridablePerStoreAsync(settings, setting => setting.${property.name}, model.${
					property.name + OverrideForStoreSuffix
				}, storeScope, false);`
			);
		});

		method.expressions.push(''); // spacer
		method.expressions.push('await _settingService.ClearCacheAsync();');
		method.expressions.push(''); // spacer
		method.expressions.push('return await Configure();');
	}

	protected generateConfigureGetMethod(config: PluginConfig, settingsController: Class): void {
		const method = new Method(Visibility.Public, 'Configure', {
			override: false,
			async: true,
			returnType: 'Task<IActionResult>'
		});
		settingsController.methods.push(method);

		settingsController.addField(
			new Field(Visibility.Private, '_settingService', 'ISettingService', {
				hasGetterAndSetter: false,
				isConstant: false,
				additionalNewLine: false,
				isReadonly: true,
				isProperty: false
			})
		);
		settingsController.usings.push(new Using('Nop.Services.Configuration'));

		settingsController.addField(
			new Field(Visibility.Private, '_storeContext', 'IStoreContext', {
				hasGetterAndSetter: false,
				isConstant: false,
				additionalNewLine: false,
				isReadonly: true,
				isProperty: false
			})
		);
		settingsController.usings.push(new Using('Nop.Core'));

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
		method.expressions.push('return View("~/Plugins/' + config.details.systemName + '/Areas/Admin/Views/Configuration/Configure.cshtml", model);');
	}
}
