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

<ul>
  Address, Balance
  {#each $addresses as entry}
    <p>
      {entry.address}
      {entry.balance}
      <button on:click={() => removeEntry(entry)}>
        -
      </button>
    </p>
  {/each}
</ul>
