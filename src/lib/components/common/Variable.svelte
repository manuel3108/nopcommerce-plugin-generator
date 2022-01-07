<script lang="ts">
	import { DataTypes } from '$lib/scripts/common/DataTypes';

	import FormField from './FormField.svelte';
	import TwoColumns from './TwoColumns.svelte';

	export let name: string;
	export let type: string;

	const dataTypes = [];

	for (const key in DataTypes) {
		dataTypes.push(key);
	}
</script>

<TwoColumns>
	<svelte:fragment slot="left">
		<FormField name="Type" required={false}>
			<select bind:value={type}>
				{#each dataTypes as v}
					<option value={DataTypes[v]}>{DataTypes[v]}</option>
				{/each}
			</select>
		</FormField>
	</svelte:fragment>
	<svelte:fragment slot="right">
		<FormField name="Name" required={false}>
			<input bind:value={name} />
		</FormField>
	</svelte:fragment>
</TwoColumns>
