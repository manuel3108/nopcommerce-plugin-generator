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

	let expanded = _expansionState[tree.fileName] || tree.isRoot;
	const toggleExpansion = () => {
		expanded = _expansionState[tree.fileName] = !expanded;
	};
	$: arrowDown = expanded;
</script>

<ul transition:slide>
	<li>
		{#if tree.isDirectory}
			<div class="pointer">
				<span on:click={toggleExpansion}>
					<span class="arrow" class:arrowDown>&#x25b6</span>
					{tree.fileName}
				</span>
				{#if expanded}
					{#each tree.children as child}
						<svelte:self tree={child} {callback} />
					{/each}
				{/if}
			</div>
		{:else}
			<button class="button is-primary" on:click={() => callback(tree.fileId)}>
				{tree.fileName}
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

	.pointer {
		cursor: pointer;
	}

	.pointer span {
		white-space: nowrap;
	}

	.arrow {
		display: inline-block;
	}
	.arrowDown {
		transform: rotate(90deg);
	}
</style>
