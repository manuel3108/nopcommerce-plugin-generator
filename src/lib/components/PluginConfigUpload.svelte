<script lang="ts">
	import FormField from './common/FormField.svelte';

	export let config;
	export let fileExtension;

	function onFileSelected(event) {
		let configFile = event.target.files[0];
		let reader = new FileReader();
		reader.readAsText(configFile);
		reader.onload = (e) => {
			const text: string = <string>e.target.result;
			config = JSON.parse(text);
		};
	}
</script>

<FormField name="Upload existing plugin config" required={false}>
	<div class="file-upload-wrapper">
		<label class="file-upload">
			<span class="mt-2 text-center leading-normal">Choose a file…</span>
			<input
				type="file"
				class="hidden"
				accept={fileExtension}
				on:change={(e) => onFileSelected(e)}
			/>
		</label>
	</div>
</FormField>
