<script lang="ts">
	import InputField from './common/InputField.svelte';
	import TwoColumns from './common/TwoColumns.svelte';
	import ListView from './common/ListView.svelte';
	import { DatabaseEntity } from '$lib/scripts/configs/PluginDatabaseConfig';
	import Variable from './common/Variable.svelte';
	import { SettingProperty } from '$lib/scripts/configs/PluginSettingsConfig';

	export let entities: DatabaseEntity[] = [];

	function addSetting() {
		entities.push(new DatabaseEntity('', ''));
		entities = entities;
	}

	function addProperty(index: number) {
		entities[index].properties.push(new SettingProperty('', ''));
		entities = entities;
	}
</script>

<ListView bind:items={entities} addItemText="Add Entity" on:addItem={addSetting} let:index>
	<div class="p-3 rounded-lg">
		<TwoColumns>
			<svelte:fragment slot="left">
				<InputField name={index + 1 + '. Class name'} bind:value={entities[index].className} />
			</svelte:fragment>
			<svelte:fragment slot="right">
				<InputField name={index + 1 + '. Table name'} bind:value={entities[index].tableName} placeholder={entities[index].className} />
			</svelte:fragment>
		</TwoColumns>

		<div class="mt-4">Properties ({entities[index].properties.length})</div>
		<ListView bind:items={entities[index].properties} addItemText="Add Property" on:addItem={() => addProperty(index)} let:index={propertyIndex}>
			<Variable bind:name={entities[index].properties[propertyIndex].name} bind:type={entities[index].properties[propertyIndex].type} />
		</ListView>
	</div>
</ListView>

<style>
	div {
		background-color: #606060;
	}
</style>
