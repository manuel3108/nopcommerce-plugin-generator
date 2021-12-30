import{F as t}from"./File-9e84454c.js";class u{generate(e){return new t(e.base.nameSpace,"csproj",[],`<Project Sdk="Microsoft.NET.Sdk">

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
</ItemGroup>

<ItemGroup>
	<Content Include="logo.png">
	<CopyToOutputDirectory>PreserveNewest</CopyToOutputDirectory>
	</Content>
	<Content Include="plugin.json">
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

</Project>`)}}export{u as default};
