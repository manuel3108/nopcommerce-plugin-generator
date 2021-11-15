<script>
	import FormField from './FormField.svelte';

	export let name;
	export let value = '';
</script>

<FormField {name}>
	<input type="text" bind:value />
</FormField>
