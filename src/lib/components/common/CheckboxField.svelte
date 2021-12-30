<script lang="ts">
	import FormField from './FormField.svelte';

	export let name;
	export let value: boolean;
</script>

<FormField {name} required={false} isCheckbox={true}>
	<input type="checkbox" bind:checked={value} />
</FormField>
