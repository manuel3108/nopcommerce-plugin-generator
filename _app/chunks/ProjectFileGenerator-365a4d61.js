import{F as p}from"./File-9e84454c.js";import{f as r,a as t,L as a}from"./index-5f5ec556.js";import"./vendor-3e99503a.js";import"./preload-helper-ec9aa979.js";class c{generate(e){return new p(e.base.nameSpace,"csproj",[],`<Project Sdk="Microsoft.NET.Sdk">

<PropertyGroup>
	<TargetFramework>net5.0</TargetFramework>
	<Copyright>Copyright \xA9 ${e.details.author}</Copyright>
	<Company>${e.details.author}</Company>
	<Authors>${e.details.author}</Authors>
	<PackageLicenseUrl></PackageLicenseUrl>
	<PackageProjectUrl>https://www.nopcommerce.com/</PackageProjectUrl>
	<RepositoryUrl>https://github.com/nopSolutions/nopCommerce</RepositoryUrl>
	<RepositoryType>Git</RepositoryType>
	<OutputPath>..\\..\\Presentation\\Nop.Web\\Plugins\\${e.details.systemName}</OutputPath>
	<OutDir>$(OutputPath)</OutDir>
	<!--Set this parameter to true to get the dlls copied from the NuGet cache to the output of your project.
	You need to set this parameter to true if your plugin has a nuget package 
	to ensure that the dlls copied from the NuGet cache to the output of your project-->
	<CopyLocalLockFileAssemblies>true</CopyLocalLockFileAssemblies>
</PropertyGroup>

<ItemGroup>
	<None Remove="logo.png" />
	<None Remove="plugin.json" />
${r().map(o=>`${t(1)}<None Remove="${o.fullPath}" />`).join(a)}
</ItemGroup>

<ItemGroup>
	<Content Include="logo.png">
		<CopyToOutputDirectory>PreserveNewest</CopyToOutputDirectory>
	</Content>
	<Content Include="plugin.json">
		<CopyToOutputDirectory>PreserveNewest</CopyToOutputDirectory>
	</Content>
${r().map(o=>`${t(1)}<Content Include="${o.fullPath}">
${t(2)}<CopyToOutputDirectory>PreserveNewest</CopyToOutputDirectory>
${t(1)}</Content>`).join(a)}
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

</Project>`)}}export{c as default};
