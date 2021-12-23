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
	const { fileName, children, isDirectory } = tree;

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
			<button on:click={() => callback(fileName)}>
				{fileName}
			</button>
		{/if}
	</li>
</ul>

<style>
	ul {
		margin: 0;
		list-style: none;
		padding-left: 1.2rem;
		user-select: none;
	}
	.arrow {
		cursor: pointer;
		display: inline-block;
		/* transition: transform 200ms; */
	}
	.arrowDown {
		transform: rotate(90deg);
	}
</style>
