<script lang='ts'>
  import { onMount } from 'svelte';
  import { SingleNodeClient } from '@iota/iota.js';

  import { addresses } from '../store/addresses';
  import type { IAddressEntry } from '../../shared/IAddressEntry';
  import { CHANNEL } from '../../shared/Channel';

  const API_ENDPOINT = 'https://chrysalis-nodes.iota.org/';

  const client = new SingleNodeClient(API_ENDPOINT);

  let address = '';
  let balance: number;
  let error = { present: false, message: ''};

  onMount(async () => {
    balance = (await client.address('iota1qzd6z226hqz9hqeexmh6yk9gpk424tyrepw7dfpzu3e5w5wqlfpyzl3tnfm')).balance;
  });

  async function addVerifiedAddress(): Promise<void> {
    try {
      balance = (await client.address(address)).balance;
      addEntry();
    } catch (e) {
      console.log(e);
      error = { present: true, message: e.message };
    };
  }

  function addEntry(): void {
    const entry: IAddressEntry = {
      address,
      balance,
    }
    globalThis.api.send(CHANNEL.ADD_ADDRESS, entry);
    addresses.update(
      (list) => {
        list.push(entry);
        return list;
      }
    );
  }
  
</script>

<p>Enter a valid IOTA Address:</p>
<input bind:value={address} placeholder='Enter your address'>
<button on:click={addVerifiedAddress}>
  Add
</button>

{#if error.present}
  <p>Error: {error.message} </p>
{/if}