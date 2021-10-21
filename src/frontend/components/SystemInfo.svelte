<script lang='ts'>  
  let systemInfo: string;

  async function sendIpcRequest(): Promise<void> {
    globalThis.api.send('requestSystemInfo', null);
  }

  globalThis.api.receive("getSystemInfo", (data) => {
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
