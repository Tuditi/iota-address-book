<script lang='ts'>
  import AddressBar from './components/AddressBar.svelte';
  import AddressList from './components/AddressList.svelte';
  import SystemInfo from './components/SystemInfo.svelte';
	export let name: string;
</script>

<main>
	<h1>IOTA {name}!</h1>
  <AddressBar />
  <AddressList />
  <SystemInfo />
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
