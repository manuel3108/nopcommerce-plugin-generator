import{F as i}from"./File-9e84454c.js";import{C as n}from"./Class-7b935fc0.js";import{F as r}from"./Field-b8f50578.js";import{U as o,V as l}from"./ClassBase-41fafc6f.js";import"./index-dd84ffed.js";import"./vendor-ee3c6b4b.js";import"./preload-helper-ec9aa979.js";class b{generate(e){const s=e.base.pluginName+"Settings";return[new i(s,"cs",[],this.generateContent(e,s))]}generateContent(e,s){const t=new n(e.base.nameSpace,s,{addCtor:!1,addRegions:!1});return t.inheritsFrom="ISettings",t.usings.push(new o("Nop.Core.Configuration")),e.settings.properties.forEach(a=>{t.addField(new r(l.Public,a.name,a.type,{hasGetterAndSetter:!0,isConstant:!1,isReadonly:!1,additionalNewLine:!1,isProperty:!1}),!1)}),t.toString()}}export{b as default};
