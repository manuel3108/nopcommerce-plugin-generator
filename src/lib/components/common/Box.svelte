<script lang="ts">
	export let title: string;
</script>

<div class="box">
	<h3 class="subtitle">{title}</h3>
	<slot />
</div>
