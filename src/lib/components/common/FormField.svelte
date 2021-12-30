<script lang="ts">
	export let name;
	export let required;
	export let isCheckbox = false;
</script>

<div class="field">
	<span class="label" class:is-checkbox={isCheckbox}>
		{name}

		{#if required}
			<span class="required">&nbsp;*</span>
		{/if}
	</span>
	<div class="control" class:is-checkbox={isCheckbox}>
		<slot />
	</div>
</div>

<style>
	.control :global(*) {
		width: 100%;
	}

	.is-checkbox {
		display: inline-block;
		margin-right: 1rem;
	}
</style>
