import{f as t,L as s,O as i,a as n}from"./index-70878895.js";import{F as d}from"./File-9e84454c.js";import"./vendor-70f8720b.js";import"./preload-helper-ec9aa979.js";class f{generate(e){const o=["Areas","Admin","Views","Configuration"],a="_Configure.Settings",r="cshtml";return t(o,a,r),[new d(a,r,o,this.generateContent(e))]}generateContent(e){return`@model ConfigurationModel
@using ${e.base.nameSpace}.Areas.Admin.Models

<div class="card-body">
${e.settings.properties.map(o=>this.generateContentForProperty(o)).join(s)}
</div>`}generateContentForProperty(e){const o=e.name+i;return`${n(1)}<div class="form-group row">
${n(2)}<div class="col-md-3">
${n(3)}<nop-override-store-checkbox asp-for="${o}" asp-input="${e.name}" asp-store-scope="@Model.ActiveStoreScopeConfiguration" />
${n(3)}<nop-label asp-for="${e.name}" />
${n(2)}</div>
${n(2)}<div class="col-md-9">
${n(3)}<nop-editor asp-for="${e.name}" />
${n(3)}<span asp-validation-for="${e.name}"></span>
${n(2)}</div>
${n(1)}</div>`}}export{f as default};
