import{C as t}from"./Class-238bcc15.js";import{F as l}from"./Field-e6092f7b.js";import{V as r}from"./ClassBase-52e6893d.js";import{F as i}from"./File-9e84454c.js";import{D as n}from"./index-7c690f16.js";import"./vendor-ee3c6b4b.js";import"./preload-helper-ec9aa979.js";class b{generate(e){const s=e.base.pluginName+"Defaults";return[new i(s,"cs",[],this.generatePluginDefaultsClassContent(e,s))]}generatePluginDefaultsClassContent(e,s){const a=new t(e.base.nameSpace,s,{addCtor:!1,addRegions:!1});return a.addField(new l(r.Public,"SystemName",n.String,{value:`"${e.details.systemName}"`,isConstant:!0,isReadonly:!1,hasGetterAndSetter:!1,additionalNewLine:!1,isProperty:!1}),!1),a.toString()}}export{b as default};
