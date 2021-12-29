<script lang="ts">
	import { Version } from '$lib/scripts/common/Version';
	import FormField from './common/FormField.svelte';

	export let version: string;

	const versions = [];

	for (const key in Version) {
		versions.push(key);
	}
</script>

<FormField name="NopCommerce Version" required={true}>
	<select bind:value={version}>
		{#each versions as v}
			<option value={Version[v]}>{Version[v]}</option>
		{/each}
	</select>
</FormField>
