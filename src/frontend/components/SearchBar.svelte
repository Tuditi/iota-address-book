<script>
  import { onMount } from 'svelte';
  import { SingleNodeClient } from '@iota/iota.js';
  const API_ENDPOINT = 'https://chrysalis-nodes.iota.org/';

  const client = new SingleNodeClient(API_ENDPOINT);

  let address = 2;
  let clientInfo = 'loading...';

  onMount(async () => {
    clientInfo = (await client.info()).name
  });
</script>

<input bind:value={address} placeholder='enter your address'>
<p>Valid Country: {clientInfo} </p>
