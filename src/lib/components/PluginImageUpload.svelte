<script>
	import FormField from './common/FormField.svelte';

	export let url;

	function onFileSelected(event) {
		let image = event.target.files[0];
		let reader = new FileReader();
		reader.readAsDataURL(image);
		reader.onload = (e) => {
			url = e.target.result;
		};
	}
</script>

<FormField name="Plugin logo" required={true}>
	<input type="file" accept=".jpg, .jpeg, .png" on:change={(e) => onFileSelected(e)} />
	{#if url}
		<img src={url} alt="" />
	{/if}
</FormField>

<style>
	img {
		width: unset !important;
	}
</style>
