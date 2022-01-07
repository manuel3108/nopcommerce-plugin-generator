<script lang="ts">
	import InputField from './common/InputField.svelte';
	import { Service } from '$lib/scripts/configs/PluginServicesConfig';
	import TwoColumns from './common/TwoColumns.svelte';
	import { getDefaultInterfaceName } from '$lib/scripts/csharp-lib/common/Helper';
	import ListView from './common/ListView.svelte';

	export let services: Service[] = [];

	function addSetting() {
		services.push(new Service('', ''));
		services = services;
	}
</script>

<ListView bind:items={services} addItemText="Add Service" on:addItem={addSetting} let:index>
	<TwoColumns>
		<svelte:fragment slot="left">
			<InputField name={index + 1 + '. Service name'} bind:value={services[index].name} />
		</svelte:fragment>
		<svelte:fragment slot="right">
			<InputField
				name={index + 1 + '. Interface name'}
				bind:value={services[index].interfaceName}
				placeholder={getDefaultInterfaceName(services[index].name)}
			/>
		</svelte:fragment>
	</TwoColumns>
</ListView>
