import{F as l}from"./File-9e84454c.js";import{C as p}from"./Class-7b935fc0.js";import{F as g}from"./Field-b8f50578.js";import{F as o}from"./FieldAttribute-df44d096.js";import{U as r,V as m,M as u}from"./ClassBase-41fafc6f.js";import{g as c}from"./index-dd84ffed.js";import{D as f}from"./datetime-c813b899.js";import"./vendor-ee3c6b4b.js";import"./preload-helper-ec9aa979.js";class v{generate(a){const s=[],t=["Migrations"],i="SchemaMigration",e=new l(i,"cs",t,this.generateContent(a,t,i));return s.push(e),s}generateContent(a,s,t){const i=f.now().toFormat("yyyy/MM/dd HH:mm:ss:SSS")+"0000",e=new p(c(a.base.nameSpace,s),t,{addCtor:!0,addRegions:!0,attributes:[new o("SkipMigrationOnUpdate"),new o(`NopMigration("${i}", "${a.details.systemName} base schema")`)]});e.usings.push(new r(a.base.nameSpace+".Domain")),e.usings.push(new r("Nop.Data.Migrations")),e.usings.push(new r("FluentMigrator")),e.inheritsFrom="AutoReversingMigration",e.addField(new g(m.Private,"_migrationManager","IMigrationManager ",{additionalNewLine:!1,hasGetterAndSetter:!1,isConstant:!1,isProperty:!1,isReadonly:!0}));const n=new u(m.Public,"Up",{returnType:"void",async:!1,override:!0});return a.database.entities.forEach(d=>{n.expressions.push(`_migrationManager.BuildTable<${d.className}>(Create);`)}),e.methods.push(n),e.toString()}}export{v as default};
