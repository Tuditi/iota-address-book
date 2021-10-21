<script lang='ts'>
  import { addresses } from '../store/addresses';
  import type { IAddressEntry } from '../types/IAddressEntry';

  function removeEntry(entry: IAddressEntry): void {
    addresses.update((list) => {
      list.splice(list.indexOf(entry),1);
      return list;
    })
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
    {#each $addresses as entry, i}
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
  </tbody>
</table>
