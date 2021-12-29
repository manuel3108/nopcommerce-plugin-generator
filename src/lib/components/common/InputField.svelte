<script>
	import FormField from './FormField.svelte';

	export let name;
	export let value = '';
	export let placeholder = '';
</script>

<FormField {name} required={!placeholder}>
	<input type="text" bind:value {placeholder} />
</FormField>
