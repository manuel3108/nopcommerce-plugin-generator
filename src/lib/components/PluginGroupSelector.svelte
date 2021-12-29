<script lang="ts">
	import { PluginGroup } from '$lib/scripts/common/PluginGroup';
	import FormField from './common/FormField.svelte';

	export let group: string;

	const groups = [];

	for (const key in PluginGroup) {
		groups.push(key);
	}
</script>

<FormField name="Plugin Group" required={true}>
	<select bind:value={group}>
		{#each groups as g}
			<option value={PluginGroup[g]}>{PluginGroup[g]}</option>
		{/each}
	</select>
</FormField>
