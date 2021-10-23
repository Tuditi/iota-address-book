<script lang='ts'>
  import { SingleNodeClient } from '@iota/iota.js';

  import type { IAddressEntry } from '../../shared/IAddressEntry';
  import { CHANNEL } from '../../shared/Channels';

  const API_ENDPOINT = 'https://chrysalis-nodes.iota.org/';
  const client = new SingleNodeClient(API_ENDPOINT);

  let address = '';
  let balance: number;
  let error = { present: false, message: ''};

  async function verifyAndAddAddress(): Promise<void> {
    try {
      balance = (await client.address(address)).balance;
      addEntry();
    } catch (e) {
      error = { present: true, message: e.message };
    };
  }

  function addEntry(): void {
    const entry: IAddressEntry = {
      address,
      balance,
    }
    globalThis.api.send(CHANNEL.ADD_ADDRESS, { data: entry });
  }  
</script>

<div class='container'>
  <p>Enter a valid IOTA Address:</p>
  <input bind:value={address} placeholder='Enter your address'>
  <button on:click={verifyAndAddAddress}>
    Add
  </button>
  
  {#if error.present}
    <div class='alert alert-danger my-3 w-100' role='alert'>
      The following error occured: {error.message}
    </div>
  {/if}
</div>
