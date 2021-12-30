<script lang="ts">
	import { DataTypes } from '$lib/scripts/common/DataTypes';

	import FormField from './FormField.svelte';

	export let name: string;
	export let type: string;

	const dataTypes = [];

	for (const key in DataTypes) {
		dataTypes.push(key);
	}
</script>

<div class="split">
	<div class="type">
		<FormField name="Type" required={false}>
			<select bind:value={type}>
				{#each dataTypes as v}
					<option value={DataTypes[v]}>{DataTypes[v]}</option>
				{/each}
			</select>
		</FormField>
	</div>
	<div class="name">
		<FormField name="Name" required={false}>
			<input bind:value={name} />
		</FormField>
	</div>
</div>

<style>
	.split {
		display: flex;
	}

	.split div {
		display: block;
		width: 50%;
	}

	.type {
		margin-right: 1rem;
	}

	.name {
		margin-left: 1rem;
	}
</style>
