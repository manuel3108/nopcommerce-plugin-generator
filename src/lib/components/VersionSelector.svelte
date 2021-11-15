<script>
	import { Version } from '$lib/scripts/common/Version';
	import FormField from './common/FormField.svelte';

	const versions = [];

	for (const key in Version) {
		versions.push(key);
	}
</script>

<FormField name="NopCommerce Version">
	<select>
		{#each versions as version}
			<option value={version}>{Version[version]}</option>
		{/each}
	</select>
</FormField>
