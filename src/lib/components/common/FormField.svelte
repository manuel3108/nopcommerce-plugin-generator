<script>
	export let name;
	export let required;
</script>

<div class="field">
	<span class="label">
		{name}

		{#if required}
			<span class="required">&nbsp;*</span>
		{/if}
	</span>
	<div class="control">
		<slot />
	</div>
</div>

<style>
	.control :global(*) {
		width: 100%;
	}
</style>
