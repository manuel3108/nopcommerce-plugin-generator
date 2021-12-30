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

<ul transition:slide>
	<li>
		{#if tree.isDirectory}
			<div class="pointer">
				<span on:click={toggleExpansion} class:active={expanded}>
					<span class="arrow" class:arrowDown>&#x25b6</span>
					{tree.fileName}
				</span>
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
	</li>
</ul>

<style>
	ul {
		margin: 0;
		list-style: none;
		padding-left: 0.5rem;
		user-select: none;
		background-color: #1e1e1e;
		height: 100%;
	}

	.pointer {
		padding-left: 0.5rem;
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

	button {
		background-color: unset;
		border: none;
		color: grey;
		padding: 0;
		margin-left: 0.5rem;
		margin: 0;
		cursor: pointer;
	}

	.pointer,
	button {
		color: grey;
		padding: 0.25rem;
		border-radius: 0.25rem;
		text-align: left;
	}

	.active {
		color: white;
	}

	button.active {
		background-color: #555;
	}

	li {
		max-width: 100px;
	}
</style>
