import type PluginConfig from '$lib/scripts/configs/PluginConfig';
import { File } from '$lib/scripts/common/File';
import type IFileGenerator from '../../IFileGenerator';
import { getViews } from '../../ViewsSingleton';
import { LineBreak } from '$lib/scripts/common/Defaults';
import { getIntend } from '$lib/scripts/csharp-lib/common/Helper';

export default class ProjectFileGenerator implements IFileGenerator {
	generate(config: PluginConfig): File[] {
		return [
			new File(
				config.base.nameSpace,
				'csproj',
				[],
				`<Project Sdk="Microsoft.NET.Sdk">

<PropertyGroup>
	<TargetFramework>net5.0</TargetFramework>
	<Copyright>Copyright © ${config.details.author}</Copyright>
	<Company>${config.details.author}</Company>
	<Authors>${config.details.author}</Authors>
	<PackageLicenseUrl></PackageLicenseUrl>
	<PackageProjectUrl>https://www.nopcommerce.com/</PackageProjectUrl>
	<RepositoryUrl>https://github.com/nopSolutions/nopCommerce</RepositoryUrl>
	<RepositoryType>Git</RepositoryType>
	<OutputPath>..\\..\\Presentation\\Nop.Web\\Plugins\\${config.details.systemName}</OutputPath>
	<OutDir>$(OutputPath)</OutDir>
	<!--Set this parameter to true to get the dlls copied from the NuGet cache to the output of your project.
	You need to set this parameter to true if your plugin has a nuget package 
	to ensure that the dlls copied from the NuGet cache to the output of your project-->
	<CopyLocalLockFileAssemblies>true</CopyLocalLockFileAssemblies>
</PropertyGroup>

<ItemGroup>
	<None Remove="logo.png" />
	<None Remove="plugin.json" />
${getViews()
	.map((view) => `${getIntend(1)}<None Remove="${view.fullPath}" />`)
	.join(LineBreak)}
</ItemGroup>

<ItemGroup>
	<Content Include="logo.png">
		<CopyToOutputDirectory>PreserveNewest</CopyToOutputDirectory>
	</Content>
	<Content Include="plugin.json">
		<CopyToOutputDirectory>PreserveNewest</CopyToOutputDirectory>
	</Content>
${getViews()
	.map(
		(view) =>
			`${getIntend(1)}<Content Include="${view.fullPath}">
${getIntend(2)}<CopyToOutputDirectory>PreserveNewest</CopyToOutputDirectory>
${getIntend(1)}</Content>`
	)
	.join(LineBreak)}
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
			)
		];
	}
}
