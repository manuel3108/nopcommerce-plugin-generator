<script>
	import JSZip from 'jszip';
	import FileSaver from 'file-saver';
	import { onMount } from 'svelte';
	import VersionSelector from '$lib/components/VersionSelector.svelte';
	import InputField from '$lib/components/common/InputField.svelte';

	let pluginName;

	function downloadZip() {
		console.log(pluginName);
		// const zip = new JSZip();
		// zip.file('idlist.txt', 'PMID:29651880\r\nPMID:29303721');
		// zip.generateAsync({ type: 'blob' }).then(function (content) {
		// 	FileSaver.saveAs(content, 'download.zip');
		// });
	}
</script>

<VersionSelector />

<InputField name="Plugin Name" bind:value={pluginName} />

<button on:click={downloadZip} class="button is-primary">Download</button>
