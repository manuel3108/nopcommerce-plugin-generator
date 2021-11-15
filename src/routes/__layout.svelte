<script>
	import Navbar from '$lib/components/Navbar.svelte';
	import '../app.scss';
</script>

<Navbar />

<main>
	<slot />
</main>

<style>
	main {
		max-width: 1000px;
		margin: 0 auto;
		padding: 20px;
	}
</style>
