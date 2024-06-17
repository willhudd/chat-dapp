<script>
	import Chat from './chat.svelte';
	import Header from './header.svelte';
</script>
	
<main class="app">
	<Header />
	<Chat />
</main>

<style>

	.app {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-color: #ffffff70;
		border-radius: 10px;
		padding: 10px;
		width: 400px;
	}

</style>