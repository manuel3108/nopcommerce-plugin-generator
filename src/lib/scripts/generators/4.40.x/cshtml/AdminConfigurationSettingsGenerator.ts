import { LineBreak, OverrideForStoreSuffix } from '$lib/scripts/common/Defaults';
import { File } from '$lib/scripts/common/File';
import type PluginConfig from '$lib/scripts/configs/PluginConfig';
import type { SettingProperty } from '$lib/scripts/configs/PluginSettingsConfig';
import { getIntend } from '$lib/scripts/csharp-lib/common/Helper';
import type IFileGenerator from '../../IFileGenerator';
import { addView } from '../../ViewsSingleton';

export default class AdminConfigurationSettingsGenerator implements IFileGenerator {
	generate(config: PluginConfig): File[] {
		const path = ['Areas', 'Admin', 'Views', 'Configuration'];
		const name = '_Configure.Settings';
		const extension = 'cshtml';
		addView(path, name, extension);
		return [new File(name, extension, path, this.generateContent(config))];
	}

	protected generateContent(config: PluginConfig): string {
		return `@model ConfigurationModel
@using ${config.base.nameSpace}.Areas.Admin.Models

<div class="card-body">
${config.settings.properties.map((property) => this.generateContentForProperty(property)).join(LineBreak)}
</div>`;
	}

	protected generateContentForProperty(property: SettingProperty) {
		const overriddenName = property.name + OverrideForStoreSuffix;

		return `${getIntend(1)}<div class="form-group row">
${getIntend(2)}<div class="col-md-3">
${getIntend(3)}<nop-override-store-checkbox asp-for="${overriddenName}" asp-input="${
			property.name
		}" asp-store-scope="@Model.ActiveStoreScopeConfiguration" />
${getIntend(3)}<nop-label asp-for="${property.name}" />
${getIntend(2)}</div>
${getIntend(2)}<div class="col-md-9">
${getIntend(3)}<nop-editor asp-for="${property.name}" />
${getIntend(3)}<span asp-validation-for="${property.name}"></span>
${getIntend(2)}</div>
${getIntend(1)}</div>`;
	}
}
