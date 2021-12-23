<script lang="ts">
	import { onMount } from 'svelte';
	import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';

	export let code = '';

	let divEl: HTMLDivElement = null;
	let editor;
	let Monaco;

	$: {
		if (Monaco) {
			editor.getModel().setValue(code);
		}
	}

	onMount(async () => {
		// @ts-ignore
		self.MonacoEnvironment = {
			getWorker: function (_moduleId: any, label: string) {
				return new editorWorker();
			}
		};

		Monaco = await import('monaco-editor');

		editor = Monaco.editor.create(divEl, {
			readOnly: true,
			language: 'csharp'
		});

		editor.layout();
		Monaco.editor.setTheme('vs-dark');

		return () => {
			editor.dispose();
		};
	});
</script>

<div bind:this={divEl} />

<style>
	div {
		height: 500px;
		overflow: hidden;
	}
</style>
