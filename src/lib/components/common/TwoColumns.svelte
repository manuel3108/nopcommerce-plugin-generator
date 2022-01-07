<div class="row">
	<div class="left">
		<slot name="left" />
	</div>
	<div class="right">
		<slot name="right" />
	</div>
</div>

<style>
	.row {
		display: flex;
	}

	.row div {
		display: block;
		width: 50%;
	}

	.left {
		margin-right: 0.5rem;
	}

	.right {
		margin-left: 0.5rem;
	}
</style>
