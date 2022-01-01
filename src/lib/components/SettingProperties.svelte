<script lang="ts">
	import { SettingProperty } from '$lib/scripts/configs/PluginSettingsConfig';
	import { DataTypes } from '$lib/scripts/common/DataTypes';
	import Variable from './common/Variable.svelte';

	export let properties: SettingProperty[] = [];

	function addSetting() {
		properties.push(new SettingProperty('', DataTypes.String));
		properties = properties;
	}
</script>

{#each properties as property}
	<Variable bind:name={property.name} bind:type={property.type} />
{/each}

<button class="button is-primary mt-3" on:click={addSetting}>Add Setting</button>

<style>
	button {
		width: 100%;
	}
</style>
