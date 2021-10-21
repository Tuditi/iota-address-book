<script lang='ts'>
  // import { addresses } from '../store/addresses';
  import type { IAddressEntry } from '../../shared/IAddressEntry';
  import { CHANNEL } from '../../shared/Channel';
  import { onMount } from 'svelte';

  let addresses: IAddressEntry[];

  onMount(async () => {
    globalThis.api.send(CHANNEL.READ_ADDRESSES, null);
  });

  globalThis.api.receive(CHANNEL.ADDRESS_READ, (data) => {
    addresses = data[0];
  });

  globalThis.api.receive(CHANNEL.ADDRESS_DELETED, (_) => {
    globalThis.api.send(CHANNEL.READ_ADDRESSES, null);
  })

  function removeEntry(entry: IAddressEntry): void {
    globalThis.api.send(CHANNEL.DELETE_ADDRESS, { data: entry });
  }
</script>

<table class='table'>
  <thead>
    <tr>
      <th scope='col'>#</th>
      <th scope='col'>Address</th>
      <th scope='col'>Balance</th>
      <th scope='col'></th>
    </tr>
  </thead>
  <tbody>
    {#if addresses}
      {#each addresses as entry, i}
      <tr>
        <th scope='row'>{i}</th>
        <td>{entry.address}</td>
        <td>{entry.balance}</td>
        <td>
          <button on:click={() => removeEntry(entry)}> - </button>
          <button on:click={() => removeEntry(entry)}> Copy </button>
        </td>
      </tr>
      {/each}
    {:else}
      Loading...
    {/if}
  </tbody>
</table>
