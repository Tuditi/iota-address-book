<script lang='ts'>
  import { onMount } from 'svelte';
  import { Trash } from 'svelte-bootstrap-icons/lib/Trash';

  import type { IAddressEntry } from '../../shared/IAddressEntry';
  import { CHANNEL } from '../../shared/Channels';

  let addresses: IAddressEntry[];

  let searchValue: string;
  let filteredAddresses: IAddressEntry[];

  onMount(async () => {
    globalThis.api.send(CHANNEL.GET_ADDRESSES, null);
  });

  globalThis.api.receive(CHANNEL.ADDRESSES, (data) => {
    filteredAddresses = data[0];
    addresses = data[0];
  });

  globalThis.api.receive(CHANNEL.ADDRESS_DELETED, (_) => {
    globalThis.api.send(CHANNEL.GET_ADDRESSES, null);
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

<div class='container'>
  <div class='row w-25 mt-3'>
    <input bind:value={searchValue} placeholder='Search for an address or balance'>
  </div>

  <div class='row'> 
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
          <tr class='align-middle'>
            <th scope='row'>{i+1}</th>
            <td>{entry.address}</td>
            <td>{entry.balance} MIOTA</td>
            <td>
              <button class='btn btn-danger px-2' on:click={() => removeEntry(entry)}>
                <Trash />
              </button>
            </td>
          </tr>
          {/each}
        {:else}
          Loading...
        {/if}
      </tbody>
    </table>
  </div>
</div>
