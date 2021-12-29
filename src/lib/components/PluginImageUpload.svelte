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
	<div class="file">
		<label class="file-label">
			<input
				class="file-input"
				name="resume"
				type="file"
				accept=".jpg, .jpeg, .png"
				on:change={(e) => onFileSelected(e)}
			/>
			<span class="file-cta">
				<span class="file-label"> Choose a file… </span>
			</span>
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

	.file-label {
		display: block !important;
		text-align: center;
	}
</style>
