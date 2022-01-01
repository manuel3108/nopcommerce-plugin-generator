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
	<div class="file">
		<label class="file-label">
			<input class="file-input" name="resume" type="file" accept={fileExtension} on:change={(e) => onFileSelected(e)} />
			<span class="file-cta">
				<span class="file-label"> Choose a file… </span>
			</span>
		</label>
	</div>
</FormField>

<style>
	.file-label {
		display: block !important;
		text-align: center;
	}
</style>
