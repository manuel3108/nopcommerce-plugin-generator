import{F as n}from"./File-9e84454c.js";import{C as r}from"./Class-9f2f159c.js";import{F as o}from"./Field-64626029.js";import{U as l,V as f}from"./ClassBase-41437210.js";import{g as m}from"./index-5456aa6a.js";import"./vendor-70f8720b.js";import"./preload-helper-ec9aa979.js";class F{generate(s){const a=[],t=["Domain"];for(const e of s.database.entities){const i=new n(e.className,"cs",t,this.generateEntityContent(e,t,s));a.push(i)}return a}generateEntityContent(s,a,t){const e=new r(m(t.base.nameSpace,a),s.className,{addCtor:!1,addRegions:!1});return e.inheritsFrom="BaseEntity",e.usings.push(new l("Nop.Core")),s.properties.forEach(i=>{e.addField(new o(f.Public,i.name,i.type,{additionalNewLine:!1,hasGetterAndSetter:!0,isConstant:!1,isProperty:!1,isReadonly:!1}),!1)}),e.toString()}}export{F as default};
