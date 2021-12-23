<script context="module">
	// retain module scoped expansion state for each tree node
	const _expansionState = {
		/* treeNodeId: expanded <boolean> */
	};
</script>

<script lang="ts">
	import type { TreeNode } from '$lib/scripts/common/FileTree';

	import { slide } from 'svelte/transition';
	export let tree: TreeNode;
	export let callback;
	const { fileName, children, isDirectory, fileId } = tree;

	let expanded = _expansionState[fileName] || false;
	const toggleExpansion = () => {
		expanded = _expansionState[fileName] = !expanded;
	};
	$: arrowDown = expanded;
</script>

<ul transition:slide>
	<li>
		{#if isDirectory}
			<span on:click={toggleExpansion}>
				<span class="arrow" class:arrowDown>&#x25b6</span>
				{fileName}
			</span>
			{#if expanded}
				{#each children as child}
					<svelte:self tree={child} {callback} />
				{/each}
			{/if}
		{:else}
			<button on:click={() => callback(fileId)}>
				{fileName}
			</button>
		{/if}
	</li>
</ul>

<style>
	ul {
		margin: 0;
		list-style: none;
		padding-left: 0.5rem;
		user-select: none;
	}
	.arrow {
		cursor: pointer;
		display: inline-block;
	}
	.arrowDown {
		transform: rotate(90deg);
	}
</style>
