import { File } from './common/File';

export class CsprojFileGenerator {
	static generateProjectFile(): File {
		return new File(
			'project',
			'csproj',
			['src', 'lib', 'scripts'],
			`<Project Sdk="Microsoft.NET.Sdk">

<PropertyGroup>
	<TargetFramework>net6.0</TargetFramework>
	<Copyright>Copyright © Nop Solutions, Ltd</Copyright>
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

</Project>`
		);
	}
}
