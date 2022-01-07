<script lang="ts">
	import { SettingProperty } from '$lib/scripts/configs/PluginSettingsConfig';
	import { DataTypes } from '$lib/scripts/common/DataTypes';
	import Variable from './common/Variable.svelte';
	import ListView from './common/ListView.svelte';

	export let properties: SettingProperty[] = [];

	function addSetting() {
		properties.push(new SettingProperty('', DataTypes.String));
		properties = properties;
	}
</script>

<ListView bind:items={properties} addItemText="Add Setting" on:addItem={addSetting} let:index>
	<Variable bind:name={properties[index].name} bind:type={properties[index].type} />
</ListView>
