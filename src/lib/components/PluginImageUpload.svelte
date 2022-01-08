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
	<div class="file-upload-wrapper">
		<label class="file-upload">
			<span class="mt-2 text-center leading-normal">Choose A file</span>
			<input
				type="file"
				class="hidden"
				accept=".jpg, .jpeg, .png"
				on:change={(e) => onFileSelected(e)}
			/>
		</label>
	</div>
</FormField>

{#if url}
	<img src={url} alt="" />
{/if}

<style>
	img {
		margin: 0 auto;
		display: block;
	}
</style>
