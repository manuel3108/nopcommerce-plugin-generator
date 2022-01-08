<script lang="ts">
	import { DataTypes } from '$lib/scripts/common/DataTypes';

	import FormField from './FormField.svelte';
	import InputField from './InputField.svelte';
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
		<InputField name="Name" bind:value={name} />
	</svelte:fragment>
</TwoColumns>
