import { File } from '$lib/scripts/common/File';
import type PluginConfig from '$lib/scripts/configs/PluginConfig';
import type IFileGenerator from '../../IFileGenerator';
import { addLanguageResource } from '../../LanguageResourceSingleton';
import { addView } from '../../ViewsSingleton';

export default class AdminConfigurationBaseGenerator implements IFileGenerator {
	generate(config: PluginConfig): File {
		const path = ['Areas', 'Admin', 'Views', 'Configuration'];
		const name = 'Configure';
		const extension = 'cshtml';
		addView(path, name, extension);
		return new File(name, extension, path, this.generateContent(config));
	}

	protected generateContent(config: PluginConfig): string {
		const languageResourceConfigureName = `Plugins.${config.details.systemName}.Configure`;
		addLanguageResource(languageResourceConfigureName, 'Configure');
		const languageResourceCardTitleName = `Plugins.${config.details.systemName}.Card.Settings`;
		addLanguageResource(languageResourceCardTitleName, 'Settings');

		return `@model ConfigurationModel
@using ${config.base.nameSpace}.Areas.Admin.Models
@using Microsoft.AspNetCore.Html

@inject IGenericAttributeService genericAttributeService
@inject IWorkContext workContext

@{
    Layout = "_AdminLayout";

    const string hideSettingsBlockAttributeName = "${config.base.pluginName}.HideSettingsBlock";
    var hideSettingsBlock = await genericAttributeService.GetAttributeAsync<bool>(await workContext.GetCurrentCustomerAsync(), hideSettingsBlockAttributeName);
}

<form asp-controller="${config.base.pluginName}Configuration" asp-action="Configure" method="post">
    <div class="content-header clearfix">
        <h1 class="float-left">
            @T("${languageResourceConfigureName}")
        </h1>
        <div class="float-right">
            <button type="submit" name="save" class="btn btn-primary">
                <i class="far fa-save"></i>
                @T("Admin.Common.Save")
            </button>
        </div>
    </div>

    <section class="content">
        <div class="container-fluid">
            @await Component.InvokeAsync("StoreScopeConfiguration")
            <div class="form-horizontal">
                <nop-cards id="${config.base.pluginName}-cards">
                    <nop-card asp-name="${config.base.pluginName}-settings" asp-icon="fas fa-cogs" asp-title="@T("${languageResourceCardTitleName}")" asp-hide-block-attribute-name="@hideSettingsBlockAttributeName" asp-hide="@hideSettingsBlock" asp-advanced="false">
                        @await Html.PartialAsync("~/Plugins/${config.details.systemName}/Areas/Admin/Views/Configuration/_Configure.Settings.cshtml", Model)
                    </nop-card>
                </nop-cards>
            </div>
        </div>
    </section>
</form>
`;
	}
}
