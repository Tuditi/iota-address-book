<script lang='ts'>
  import { CHANNEL } from '../../shared/Channel';
  
  let systemInfo: string;

  function sendIpcRequest(): void {
    globalThis.api.send(CHANNEL.REQUEST_SYSTEM_INFO, null);
  }

  globalThis.api.receive(CHANNEL.GET_SYSTEM_INFO, (data) => {
    systemInfo = data[0];
  });
</script>

<button on:click={sendIpcRequest}>
  Request OS Info
</button>

{#if systemInfo}
<p>
  {systemInfo}
</p>
{/if}
