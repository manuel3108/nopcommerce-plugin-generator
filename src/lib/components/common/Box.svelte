<script lang="ts">
	import { slide } from 'svelte/transition';

	export let title: string;

	let isExpanded = true;

	function expandOrHide() {
		isExpanded = !isExpanded;
	}
</script>

<div class="box">
	<div class="is-flex is-flex-direction-row">
		<div class="is-flex-grow-1"><h3 class="subtitle">{title}</h3></div>
		<div>
			<button class="button is-primary is-small" on:click={expandOrHide}>
				{isExpanded ? 'Hide' : 'Expand'}
			</button>
		</div>
	</div>

	{#if isExpanded}
		<div transition:slide>
			<slot />
		</div>
	{/if}
</div>

<style>
	button {
		margin-bottom: 0;
	}
</style>
