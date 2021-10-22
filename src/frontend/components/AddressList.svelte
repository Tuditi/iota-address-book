<script lang='ts'>
  // import { addresses } from '../store/addresses';
  import type { IAddressEntry } from '../../shared/IAddressEntry';
  import { CHANNEL } from '../../shared/Channel';
  import { onMount } from 'svelte';

  let addresses: IAddressEntry[];

  let searchValue: string;
  let filteredAddresses: IAddressEntry[];

  onMount(async () => {
    globalThis.api.send(CHANNEL.READ_ADDRESSES, null);
  });

  globalThis.api.receive(CHANNEL.ADDRESS_READ, (data) => {
    filteredAddresses = data[0];
    addresses = data[0];
  });

  globalThis.api.receive(CHANNEL.ADDRESS_DELETED, (_) => {
    globalThis.api.send(CHANNEL.READ_ADDRESSES, null);
  })

  function removeEntry(entry: IAddressEntry): void {
    globalThis.api.send(CHANNEL.DELETE_ADDRESS, { data: entry });
  }

  function filterAddresses(filter: string): void {
    if (filter) {
      filteredAddresses = addresses.filter((entry) => validEntry(entry, filter));      
    } else {
      filteredAddresses = addresses;
    }
  }

  function validEntry(entry: IAddressEntry, conditional: string): boolean {
    return entry.address.startsWith(conditional) || 
      entry.balance.toString().startsWith(conditional);
  }

  $: filterAddresses(searchValue);
</script>

<br />
<input bind:value={searchValue} placeholder='Search for an address or balance'>

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
      {#each filteredAddresses as entry, i}
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
