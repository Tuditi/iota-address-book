/* eslint-disable @typescript-eslint/no-explicit-any */
import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld(
  'api', {
    send: (channel: string, data: any) =>
    {
      const validChannels = ['requestSystemInfo'];
      if (validChannels.includes(channel))
      {
        ipcRenderer.send(channel, data);
      }
    },
    receive: (channel: string, func: (args: any) => void) =>
    {
      const validChannels = ['getSystemInfo'];
      if (validChannels.includes(channel))
      {
        ipcRenderer.on(channel, (event, ...args) => func(args));
      }
    }
  }
)
