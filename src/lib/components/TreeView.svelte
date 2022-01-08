<script context="module">
	// retain module scoped expansion state for each tree node
	const _expansionState = {
		/* treeNodeId: expanded <boolean> */
	};
</script>

<script lang="ts">
	import type { TreeNode } from '$lib/scripts/common/FileTree';

	export let tree: TreeNode;
	export let callback;
	export let activeFileId = 0;

	let expanded = _expansionState[tree.fileName] || tree.isRoot;
	const toggleExpansion = () => {
		expanded = _expansionState[tree.fileName] = !expanded;
	};
	$: arrowDown = expanded;

	function clickHandler(fileId) {
		activeFileId = fileId;
		callback(fileId);
	}
</script>

<div class="tree-view" class:root={tree.isRoot}>
	{#if tree.isDirectory}
		<div class="cursor-pointer">
			<div on:click={toggleExpansion}>
				<span class="arrow" class:arrowDown>&#x25b6</span>
				{tree.fileName}
			</div>
			{#if expanded}
				{#each tree.children as child}
					<svelte:self tree={child} {callback} bind:activeFileId />
				{/each}
			{/if}
		</div>
	{:else}
		<button class:active={activeFileId == tree.fileId} on:click={() => clickHandler(tree.fileId)}>
			{tree.fileName}
		</button>
	{/if}
</div>

<style>
	.tree-view {
		background-color: #1e1e1e;
		height: 100%;
	}

	.tree-view:not(.root) {
		white-space: nowrap;
		padding-left: 24px;
	}

	.root {
		overflow: auto;
	}

	.active {
		background-color: #343c3d;
		width: 100%;
		text-align: left;
	}

	.arrow {
		display: inline-block;
	}
	.arrowDown {
		transform: rotate(90deg);
	}
</style>
