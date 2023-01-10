import{F as s}from"./File-9e84454c.js";import{h as o,c as n}from"./index-b0b0fd3f.js";import"./vendor-ee3c6b4b.js";import"./preload-helper-ec9aa979.js";class u{generate(e){const t=["Areas","Admin","Views","Configuration"],a="Configure",i="cshtml";return o(t,a,i),[new s(a,i,t,this.generateContent(e))]}generateContent(e){const t=`Plugins.${e.details.systemName}.Configure`;n(t,"Configure");const a=`Plugins.${e.details.systemName}.Card.Settings`;return n(a,"Settings"),`@model ConfigurationModel
@using ${e.base.nameSpace}.Areas.Admin.Models
@using Microsoft.AspNetCore.Html

@inject IGenericAttributeService genericAttributeService
@inject IWorkContext workContext

@{
    Layout = "_AdminLayout";

    const string hideSettingsBlockAttributeName = "${e.base.pluginName}.HideSettingsBlock";
    var hideSettingsBlock = await genericAttributeService.GetAttributeAsync<bool>(await workContext.GetCurrentCustomerAsync(), hideSettingsBlockAttributeName);
}

<form asp-controller="${e.base.pluginName}Configuration" asp-action="Configure" method="post">
    <div class="content-header clearfix">
        <h1 class="float-left">
            @T("${t}")
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
                <nop-cards id="${e.base.pluginName}-cards">
                    <nop-card asp-name="${e.base.pluginName}-settings" asp-icon="fas fa-cogs" asp-title="@T("${a}")" asp-hide-block-attribute-name="@hideSettingsBlockAttributeName" asp-hide="@hideSettingsBlock" asp-advanced="false">
                        @await Html.PartialAsync("~/Plugins/${e.details.systemName}/Areas/Admin/Views/Configuration/_Configure.Settings.cshtml", Model)
                    </nop-card>
                </nop-cards>
            </div>
        </div>
    </section>
</form>
`}}export{u as default};