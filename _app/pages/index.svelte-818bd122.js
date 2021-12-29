import{S as M,i as L,s as G,G as je,e as g,t as B,k as I,c as v,a as y,g as U,d as h,n as j,b as w,f as $,E as b,h as Se,H as Ee,I as Oe,J as Fe,x as N,u as P,j as S,m as E,o as O,v as F,F as R,K as le,L as ie,M as H,A as Ve,W as Re,N as X,O as Ae,P as ae,Q as ue,l as K,r as ce,w as fe,R as pe,T as me,U as de}from"../chunks/vendor-86990cd0.js";import{_ as Me}from"../chunks/preload-helper-ec9aa979.js";var Q;(function(o){o.Version_4_40_x="4.40.x",o.Version_4_3="4.3"})(Q||(Q={}));function Le(o){let e,n,t,r,l,s;const a=o[2].default,i=je(a,o,o[1],null);return{c(){e=g("div"),n=g("label"),t=B(o[0]),r=I(),l=g("div"),i&&i.c(),this.h()},l(c){e=v(c,"DIV",{class:!0});var f=y(e);n=v(f,"LABEL",{class:!0});var p=y(n);t=U(p,o[0]),p.forEach(h),r=j(f),l=v(f,"DIV",{class:!0});var d=y(l);i&&i.l(d),d.forEach(h),f.forEach(h),this.h()},h(){w(n,"class","label"),w(l,"class","control"),w(e,"class","field")},m(c,f){$(c,e,f),b(e,n),b(n,t),b(e,r),b(e,l),i&&i.m(l,null),s=!0},p(c,[f]){(!s||f&1)&&Se(t,c[0]),i&&i.p&&(!s||f&2)&&Ee(i,a,c,c[1],s?Fe(a,c[1],f,null):Oe(c[1]),null)},i(c){s||(N(i,c),s=!0)},o(c){P(i,c),s=!1},d(c){c&&h(e),i&&i.d(c)}}}function Ge(o,e,n){let{$$slots:t={},$$scope:r}=e,{name:l}=e;return o.$$set=s=>{"name"in s&&n(0,l=s.name),"$$scope"in s&&n(1,r=s.$$scope)},[l,r,t]}class he extends M{constructor(e){super();L(this,e,Ge,Le,G,{name:0})}}function _e(o,e,n){const t=o.slice();return t[1]=e[n],t}function ge(o){let e,n=Q[o[1]]+"",t,r;return{c(){e=g("option"),t=B(n),this.h()},l(l){e=v(l,"OPTION",{});var s=y(e);t=U(s,n),s.forEach(h),this.h()},h(){e.__value=r=o[1],e.value=e.__value},m(l,s){$(l,e,s),b(e,t)},p:R,d(l){l&&h(e)}}}function Be(o){let e,n=o[0],t=[];for(let r=0;r<n.length;r+=1)t[r]=ge(_e(o,n,r));return{c(){e=g("select");for(let r=0;r<t.length;r+=1)t[r].c()},l(r){e=v(r,"SELECT",{});var l=y(e);for(let s=0;s<t.length;s+=1)t[s].l(l);l.forEach(h)},m(r,l){$(r,e,l);for(let s=0;s<t.length;s+=1)t[s].m(e,null)},p(r,l){if(l&1){n=r[0];let s;for(s=0;s<n.length;s+=1){const a=_e(r,n,s);t[s]?t[s].p(a,l):(t[s]=ge(a),t[s].c(),t[s].m(e,null))}for(;s<t.length;s+=1)t[s].d(1);t.length=n.length}},d(r){r&&h(e),le(t,r)}}}function Ue(o){let e,n;return e=new he({props:{name:"NopCommerce Version",$$slots:{default:[Be]},$$scope:{ctx:o}}}),{c(){S(e.$$.fragment)},l(t){E(e.$$.fragment,t)},m(t,r){O(e,t,r),n=!0},p(t,[r]){const l={};r&16&&(l.$$scope={dirty:r,ctx:t}),e.$set(l)},i(t){n||(N(e.$$.fragment,t),n=!0)},o(t){P(e.$$.fragment,t),n=!1},d(t){F(e,t)}}}function qe(o){const e=[];for(const n in Q)e.push(n);return[e]}class Je extends M{constructor(e){super();L(this,e,qe,Ue,G,{})}}function We(o){let e,n,t;return{c(){e=g("input"),this.h()},l(r){e=v(r,"INPUT",{type:!0}),this.h()},h(){w(e,"type","text")},m(r,l){$(r,e,l),ie(e,o[0]),n||(t=H(e,"input",o[2]),n=!0)},p(r,l){l&1&&e.value!==r[0]&&ie(e,r[0])},d(r){r&&h(e),n=!1,t()}}}function ze(o){let e,n;return e=new he({props:{name:o[1],$$slots:{default:[We]},$$scope:{ctx:o}}}),{c(){S(e.$$.fragment)},l(t){E(e.$$.fragment,t)},m(t,r){O(e,t,r),n=!0},p(t,[r]){const l={};r&2&&(l.name=t[1]),r&9&&(l.$$scope={dirty:r,ctx:t}),e.$set(l)},i(t){n||(N(e.$$.fragment,t),n=!0)},o(t){P(e.$$.fragment,t),n=!1},d(t){F(e,t)}}}function He(o,e,n){let{name:t}=e,{value:r=""}=e;function l(){r=this.value,n(0,r)}return o.$$set=s=>{"name"in s&&n(1,t=s.name),"value"in s&&n(0,r=s.value)},[r,t,l]}class ve extends M{constructor(e){super();L(this,e,He,ze,G,{name:1,value:0})}}const $e=`
`,x="    ";function k(o){let e="";for(let n=0;n<o;n++)e+=x;return e}class ye{constructor(e,n){this.type=e,this.name=n}toString(){return`${this.type} ${this.name}`}}class Ke{constructor(e,n){this.visibility=e,this.name=n,this.parameters=[],this.parameters.push(new ye("string","name")),this.parameters.push(new ye("MyComplexType","asd"))}toString(e){return`${k(e)}${this.visibility} ${this.name}(${this.parameters.map(n=>n.toString()).join(", ")}) {
${k(e)}}`}}class Qe{constructor(e){this.name=e}toString(){return`using ${this.name};`}}var ee;(function(o){o.Public="public",o.Private="private",o.Protected="protected"})(ee||(ee={}));class Ye{constructor(e,n){this.namespace=e,this.name=n,this.myConstructor=new Ke(ee.Public,n),this.usings=[],this.methods=[],this.usings.push(new Qe("System"))}toString(){const e=1;return`${this.usings.map(n=>n.toString()).join($e)}

namespace ${this.namespace} {
${k(e)}public class ${this.name} {

${k(e+1)}#region Fields

${k(e+1)}#endregion

${k(e+1)}#region Ctor

${this.myConstructor.toString(e+1)}

${k(e+1)}#endregion

${k(e+1)}#region Methods

${this.methods.map(n=>n.toString(e+1)).join($e)}

${k(e+1)}#endregion
${k(e)}}
}`}}function Ze(o){let e;return{c(){e=g("div"),this.h()},l(n){e=v(n,"DIV",{class:!0}),y(e).forEach(h),this.h()},h(){w(e,"class","svelte-lv85rs")},m(n,t){$(n,e,t),o[4](e)},p:R,i:R,o:R,d(n){n&&h(e),o[4](null)}}}function Xe(o,e,n){let{code:t=""}=e,r=null,l,s;Ve(async()=>(self.MonacoEnvironment={getWorker(i,c){return new Re}},n(3,s=await Me(()=>import("../chunks/editor.main-a6d1ef13.js").then(function(i){return i.e}),["chunks/editor.main-a6d1ef13.js","assets/editor.main-ac9c204b.css"])),n(2,l=s.editor.create(r,{readOnly:!0,language:"csharp"})),l.layout(),s.editor.setTheme("vs-dark"),()=>{l.dispose()}));function a(i){X[i?"unshift":"push"](()=>{r=i,n(0,r)})}return o.$$set=i=>{"code"in i&&n(1,t=i.code)},o.$$.update=()=>{o.$$.dirty&14&&s&&l.getModel().setValue(t)},[r,t,l,s,a]}class xe extends M{constructor(e){super();L(this,e,Xe,Ze,G,{code:1})}}function be(o,e,n){const t=o.slice();return t[10]=e[n],t}function et(o){let e,n,t,r;return{c(){e=g("button"),n=B(o[3])},l(l){e=v(l,"BUTTON",{});var s=y(e);n=U(s,o[3]),s.forEach(h)},m(l,s){$(l,e,s),b(e,n),t||(r=H(e,"click",o[9]),t=!0)},p:R,i:R,o:R,d(l){l&&h(e),t=!1,r()}}}function tt(o){let e,n,t,r,l,s,a,i,c,f,p=o[1]&&Ne(o);return{c(){e=g("span"),n=g("span"),t=B("\u25B6"),r=I(),l=B(o[3]),s=I(),p&&p.c(),a=K(),this.h()},l(d){e=v(d,"SPAN",{});var m=y(e);n=v(m,"SPAN",{class:!0});var C=y(n);t=U(C,"\u25B6"),C.forEach(h),r=j(m),l=U(m,o[3]),m.forEach(h),s=j(d),p&&p.l(d),a=K(),this.h()},h(){w(n,"class","arrow svelte-33qbjy"),pe(n,"arrowDown",o[2])},m(d,m){$(d,e,m),b(e,n),b(n,t),b(e,r),b(e,l),$(d,s,m),p&&p.m(d,m),$(d,a,m),i=!0,c||(f=H(e,"click",o[7]),c=!0)},p(d,m){m&4&&pe(n,"arrowDown",d[2]),d[1]?p?(p.p(d,m),m&2&&N(p,1)):(p=Ne(d),p.c(),N(p,1),p.m(a.parentNode,a)):p&&(ce(),P(p,1,1,()=>{p=null}),fe())},i(d){i||(N(p),i=!0)},o(d){P(p),i=!1},d(d){d&&h(e),d&&h(s),p&&p.d(d),d&&h(a),c=!1,f()}}}function Ne(o){let e,n,t=o[4],r=[];for(let s=0;s<t.length;s+=1)r[s]=Pe(be(o,t,s));const l=s=>P(r[s],1,1,()=>{r[s]=null});return{c(){for(let s=0;s<r.length;s+=1)r[s].c();e=K()},l(s){for(let a=0;a<r.length;a+=1)r[a].l(s);e=K()},m(s,a){for(let i=0;i<r.length;i+=1)r[i].m(s,a);$(s,e,a),n=!0},p(s,a){if(a&17){t=s[4];let i;for(i=0;i<t.length;i+=1){const c=be(s,t,i);r[i]?(r[i].p(c,a),N(r[i],1)):(r[i]=Pe(c),r[i].c(),N(r[i],1),r[i].m(e.parentNode,e))}for(ce(),i=t.length;i<r.length;i+=1)l(i);fe()}},i(s){if(!n){for(let a=0;a<t.length;a+=1)N(r[a]);n=!0}},o(s){r=r.filter(Boolean);for(let a=0;a<r.length;a+=1)P(r[a]);n=!1},d(s){le(r,s),s&&h(e)}}}function Pe(o){let e,n;return e=new ke({props:{tree:o[10],callback:o[0]}}),{c(){S(e.$$.fragment)},l(t){E(e.$$.fragment,t)},m(t,r){O(e,t,r),n=!0},p(t,r){const l={};r&1&&(l.callback=t[0]),e.$set(l)},i(t){n||(N(e.$$.fragment,t),n=!0)},o(t){P(e.$$.fragment,t),n=!1},d(t){F(e,t)}}}function rt(o){let e,n,t,r,l,s;const a=[tt,et],i=[];function c(f,p){return f[5]?0:1}return t=c(o),r=i[t]=a[t](o),{c(){e=g("ul"),n=g("li"),r.c(),this.h()},l(f){e=v(f,"UL",{class:!0});var p=y(e);n=v(p,"LI",{});var d=y(n);r.l(d),d.forEach(h),p.forEach(h),this.h()},h(){w(e,"class","svelte-33qbjy")},m(f,p){$(f,e,p),b(e,n),i[t].m(n,null),s=!0},p(f,[p]){r.p(f,p)},i(f){s||(N(r),Ae(()=>{l||(l=ae(e,ue,{},!0)),l.run(1)}),s=!0)},o(f){P(r),l||(l=ae(e,ue,{},!1)),l.run(0),s=!1},d(f){f&&h(e),i[t].d(),f&&l&&l.end()}}}const we={};function nt(o,e,n){let t,{tree:r}=e,{callback:l}=e;const{fileName:s,children:a,isDirectory:i,fileId:c}=r;let f=we[s]||!1;const p=()=>{n(1,f=we[s]=!f)},d=()=>l(c);return o.$$set=m=>{"tree"in m&&n(8,r=m.tree),"callback"in m&&n(0,l=m.callback)},o.$$.update=()=>{o.$$.dirty&2&&n(2,t=f)},[l,f,t,s,a,i,c,p,r,d]}class ke extends M{constructor(e){super();L(this,e,nt,rt,G,{tree:8,callback:0})}}class te{constructor(e,n,t,r){this.name=e,this.path=t,this.extension=n,this.content=r}get Path(){return this.path}get fullName(){return this.name+"."+this.extension}}class st{static generateProjectFile(){return new te("project","csproj",["src","lib","scripts"],`<Project Sdk="Microsoft.NET.Sdk">

<PropertyGroup>
	<TargetFramework>net6.0</TargetFramework>
	<Copyright>Copyright \xA9 Nop Solutions, Ltd</Copyright>
	<Company>Nop Solutions, Ltd</Company>
	<Authors>Nop Solutions, Ltd</Authors>
	<PackageLicenseUrl></PackageLicenseUrl>
	<PackageProjectUrl>https://www.nopcommerce.com/</PackageProjectUrl>
	<RepositoryUrl>https://github.com/nopSolutions/nopCommerce</RepositoryUrl>
	<RepositoryType>Git</RepositoryType>
	<OutputPath>..\\..\\Presentation\\Nop.Web\\Plugins\\DiscountRules.CustomerRoles</OutputPath>
	<OutDir>$(OutputPath)</OutDir>
	<!--Set this parameter to true to get the dlls copied from the NuGet cache to the output of your project.
	You need to set this parameter to true if your plugin has a nuget package 
	to ensure that the dlls copied from the NuGet cache to the output of your project-->
	<CopyLocalLockFileAssemblies>false</CopyLocalLockFileAssemblies>
</PropertyGroup>

<ItemGroup>
	<None Remove="logo.jpg" />
	<None Remove="plugin.json" />
	<None Remove="Views\\Configure.cshtml" />
	<None Remove="Views\\_ViewImports.cshtml" />
</ItemGroup>

<ItemGroup>
	<Content Include="logo.jpg">
	<CopyToOutputDirectory>PreserveNewest</CopyToOutputDirectory>
	</Content>
	<Content Include="plugin.json">
	<CopyToOutputDirectory>PreserveNewest</CopyToOutputDirectory>
	</Content>
	<Content Include="Views\\Configure.cshtml">
	<CopyToOutputDirectory>PreserveNewest</CopyToOutputDirectory>
	</Content>
	<Content Include="Views\\_ViewImports.cshtml">
	<CopyToOutputDirectory>PreserveNewest</CopyToOutputDirectory>
	</Content>
</ItemGroup>

<ItemGroup>
	<ProjectReference Include="..\\..\\Presentation\\Nop.Web.Framework\\Nop.Web.Framework.csproj" />
	<ClearPluginAssemblies Include="$(MSBuildProjectDirectory)\\..\\..\\Build\\ClearPluginAssemblies.proj" />
</ItemGroup>

<!-- This target execute after "Build" target -->
<Target Name="NopTarget" AfterTargets="Build">
	<!-- Delete unnecessary libraries from plugins path -->
	<MSBuild Projects="@(ClearPluginAssemblies)" Properties="PluginPath=$(MSBuildProjectDirectory)\\$(OutDir)" Targets="NopClear" />
</Target>

</Project>`)}}class Ce{static generatePluginsJson(){return new te("plugins","json",["test"],JSON.stringify({Group:"Discount requirements",FriendlyName:"Must be assigned to customer role",SystemName:"DiscountRequirement.MustBeAssignedToCustomerRole",Version:"1.39",SupportedVersions:["4.50"],Author:"nopCommerce team",DisplayOrder:1,FileName:"Nop.Plugin.DiscountRules.CustomerRoles.dll",Description:"This plugin allows you to configure discounts for certain customer groups (roles)"},null,x))}static generatePluginsJson2(){return new te("asd","json",["test"],JSON.stringify({Group:"Discount requirements",FriendlyName:"Must be assigned to customer role",SystemName:"DiscountRequirement.MustBeAssignedToCustomerRole",Version:"1.39",SupportedVersions:["4.50"],Author:"nopCommerce team",DisplayOrder:1,FileName:"Nop.Plugin.DiscountRules.CustomerRoles.dll",Description:"This plugin allows you to configure discounts for certain customer groups (roles)"},null,x))}}class re{static generate(){const e=[];return e.push(Ce.generatePluginsJson()),e.push(Ce.generatePluginsJson2()),e.push(st.generateProjectFile()),re.updateFileIds(e),e}static updateFileIds(e){e.forEach((n,t)=>{n.id=t})}}function ot(o){let e,n,t,r,l,s,a,i,c,f,p,d,m,C,D,Y,A,T,z,Z,ne;e=new Je({});function Te(u){o[8](u)}let se={name:"Plugin Name"};o[0]!==void 0&&(se.value=o[0]),t=new ve({props:se}),X.push(()=>me(t,"value",Te));function Ie(u){o[9](u)}let oe={name:"NameSpace"};return o[1]!==void 0&&(oe.value=o[1]),s=new ve({props:oe}),X.push(()=>me(s,"value",Ie)),D=new ke({props:{tree:o[2],callback:o[5]}}),T=new xe({props:{code:o[3]}}),{c(){S(e.$$.fragment),n=I(),S(t.$$.fragment),l=I(),S(s.$$.fragment),i=I(),c=g("div"),f=g("button"),p=B("Download"),d=I(),m=g("div"),C=g("div"),S(D.$$.fragment),Y=I(),A=g("div"),S(T.$$.fragment),this.h()},l(u){E(e.$$.fragment,u),n=j(u),E(t.$$.fragment,u),l=j(u),E(s.$$.fragment,u),i=j(u),c=v(u,"DIV",{});var _=y(c);f=v(_,"BUTTON",{class:!0});var q=y(f);p=U(q,"Download"),q.forEach(h),_.forEach(h),d=j(u),m=v(u,"DIV",{class:!0});var V=y(m);C=v(V,"DIV",{class:!0});var J=y(C);E(D.$$.fragment,J),J.forEach(h),Y=j(V),A=v(V,"DIV",{class:!0});var W=y(A);E(T.$$.fragment,W),W.forEach(h),V.forEach(h),this.h()},h(){w(f,"class","button is-primary"),w(C,"class","files svelte-7z49qi"),w(A,"class","editor svelte-7z49qi"),w(m,"class","split-view svelte-7z49qi")},m(u,_){O(e,u,_),$(u,n,_),O(t,u,_),$(u,l,_),O(s,u,_),$(u,i,_),$(u,c,_),b(c,f),b(f,p),$(u,d,_),$(u,m,_),b(m,C),O(D,C,null),b(m,Y),b(m,A),O(T,A,null),z=!0,Z||(ne=H(f,"click",o[4]),Z=!0)},p(u,[_]){const q={};!r&&_&1&&(r=!0,q.value=u[0],de(()=>r=!1)),t.$set(q);const V={};!a&&_&2&&(a=!0,V.value=u[1],de(()=>a=!1)),s.$set(V);const J={};_&4&&(J.tree=u[2]),D.$set(J);const W={};_&8&&(W.code=u[3]),T.$set(W)},i(u){z||(N(e.$$.fragment,u),N(t.$$.fragment,u),N(s.$$.fragment,u),N(D.$$.fragment,u),N(T.$$.fragment,u),z=!0)},o(u){P(e.$$.fragment,u),P(t.$$.fragment,u),P(s.$$.fragment,u),P(D.$$.fragment,u),P(T.$$.fragment,u),z=!1},d(u){F(e,u),u&&h(n),F(t,u),u&&h(l),F(s,u),u&&h(i),u&&h(c),u&&h(d),u&&h(m),F(D),F(T),Z=!1,ne()}}}function De(o){const{children:e}=o,n=e.filter(l=>l.isDirectory),t=e.filter(l=>!l.isDirectory);n.sort((l,s)=>l.fileName.localeCompare(s.fileName)),t.sort((l,s)=>l.fileName.localeCompare(s.fileName));const r=[...n,...t];return o.children=r,o.children.forEach(l=>{De(l)}),o}function lt(o){var e=[];function n(r){var l=[...r.Path,r.fullName],s=l,a=e;for(let i=0;i<s.length;i++){let c={fileName:s[i],isDirectory:!0,children:[],fileId:-1};i==s.length-1&&(c.isDirectory=!1,c.fileName=r.fullName,c.fileId=r.id),a[s[i]]=a[s[i]]||c,a[s[i]].children=a[s[i]].children||{},a=a[s[i]].children}}function t(r){Object.keys(r||{}).map(l=>{r[l].children&&t(r[l])}),r.children&&(r.children=Object.values(r.children),r.children.forEach(t))}return o.map(n),t(e),Object.values(e)}function it(o,e,n){let t="FancyPdf",r="Innovapps.Nop.Pluing.Misc.FancyPdf",l,s="",a={children:[],fileName:"root",isDirectory:!0,fileId:-1},i=[];function c(){console.log(t)}function f(m){n(3,s=i[m].content)}function p(m){t=m,n(0,t)}function d(m){r=m,n(1,r)}return o.$$.update=()=>{if(o.$$.dirty&199){n(6,l=new Ye(r,t)),n(3,s=l.toString()),n(7,i=re.generate());const m=lt(i);n(2,a.children=m,a),n(2,a=De(a))}},[t,r,a,s,c,f,l,i,p,d]}class ct extends M{constructor(e){super();L(this,e,it,ot,G,{})}}export{ct as default};
