<script lang='ts'>
  import { onMount } from 'svelte';
  import { SingleNodeClient, Bech32Helper } from '@iota/iota.js';

  import { addresses } from '../store/addresses';

  const API_ENDPOINT = 'https://chrysalis-nodes.iota.org/';

  const client = new SingleNodeClient(API_ENDPOINT);

  let address = '';
  let balance: number;

  onMount(async () => {
    balance = (await client.address('iota1qzd6z226hqz9hqeexmh6yk9gpk424tyrepw7dfpzu3e5w5wqlfpyzl3tnfm')).balance;
    console.log("balance:", balance);
  });

  async function addVerifiedAddress(): Promise<void> {
    try {
      (await client.address(address)).balance
      Bech32Helper.fromBech32(address, 'iota');
      addresses.update(
        (list) => {
          list.push({
            address,
            balance
          });
          return list;
        }
      );
    } catch (_) {
      console.log('Invalid Address:', address);
    };
  }
  
</script>

<p>Enter a valid IOTA Address:</p>
<input bind:value={address} placeholder='Enter your address'>
<button on:click={addVerifiedAddress}>
  Add
</button>
