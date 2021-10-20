/* eslint-disable @typescript-eslint/no-explicit-any */
import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld(
  'api', {
    send: (channel: string, data: any) => {
      const validChannels = ['toMain', 'requestSystemInfo'];
      if (validChannels.includes(channel)) {
        ipcRenderer.send(channel, data);
      }
    },
    receive: (channel: string, func: (args: any) => void) => {
      const validChannels = ['fromMain', 'getSystemInfo'];
      if (validChannels.includes(channel)) {
        ipcRenderer.on(channel, (event, ...args) => func(args));
      }
    }
  }
)
