import{g as f,D as l,N as m,b as c,c as p,O as g}from"./index-70878895.js";import{F}from"./File-9e84454c.js";import{F as n}from"./Field-71b02e76.js";import{F as b}from"./FieldAttribute-df44d096.js";import{C as N,U as d,V as r}from"./ClassBase-bd07e1e4.js";import"./vendor-70f8720b.js";import"./preload-helper-ec9aa979.js";class C extends N{constructor(e,a,t){super("record",e,a,t)}}class j{generate(e){const a="ConfigurationModel",t=["Areas","Admin","Models"];return[new F(a,"cs",t,this.generateContent(e,a,t))]}generateContent(e,a,t){const s=new C(f(e.base.nameSpace,t),a,{addCtor:!1,addRegions:!1});return s.inheritsFrom="BaseNopModel",s.usings.push(new d("Nop.Web.Framework.Mvc.ModelBinding")),s.usings.push(new d("Nop.Web.Framework.Models")),s.addField(new n(r.Public,"ActiveStoreScopeConfiguration",l.Integer,{hasGetterAndSetter:!0,isConstant:!1,isReadonly:!1,additionalNewLine:!0,isProperty:!1}),!1),e.settings.properties.forEach(i=>{const o=m+e.details.systemName+".Configuration."+i.name;c(o,i.name),s.addField(new n(r.Public,i.name,i.type,{hasGetterAndSetter:!0,isConstant:!1,isReadonly:!1,attribute:new b(p+'("'+o+'")'),additionalNewLine:!1,isProperty:!1}),!1),s.addField(new n(r.Public,i.name+g,l.Boolean,{hasGetterAndSetter:!0,isConstant:!1,isReadonly:!1,additionalNewLine:!0,isProperty:!1}),!1)}),s.toString()}}export{j as default};
