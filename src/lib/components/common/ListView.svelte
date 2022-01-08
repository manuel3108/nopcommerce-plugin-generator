<script>
	import { createEventDispatcher } from 'svelte';

	export let items = [];
	export let addItemText;

	const eventDispatcher = createEventDispatcher();

	function deleteItem(i) {
		items.splice(i, 1);
		items = items;
	}

	function addItem() {
		eventDispatcher('addItem');
	}
</script>

{#each items as item, i}
	<div class="list-item py-2">
		<div class="list-value">
			<slot {item} index={i} />
		</div>
		<div class="delete-button">
			<button class="button is-primary is-small" on:click={() => deleteItem(i)}>Remove</button>
		</div>
	</div>
{/each}

<button class="button is-primary mt-3 add-button" on:click={addItem}>{addItemText}</button>

<style>
	.list-item {
		display: flex;
		align-items: flex-end;
	}

	.list-value {
		flex: 1;
	}

	.delete-button {
		margin-left: 1rem;
	}

	.add-button {
		width: 100%;
	}
</style>
