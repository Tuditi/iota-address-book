/* eslint-disable @typescript-eslint/no-explicit-any */
import { contextBridge, ipcRenderer } from 'electron';
import { CHANNEL } from '../shared/Channel';

contextBridge.exposeInMainWorld(
  'api', {
    send: (channel: CHANNEL, data: any) =>
    {
      const validChannels = [
        CHANNEL.ADD_ADDRESS,
        CHANNEL.READ_ADDRESSES,
        CHANNEL.DELETE_ADDRESS,
      ];
      if (validChannels.includes(channel))
      {
        ipcRenderer.send(channel, data);
      }
    },
    receive: (channel: CHANNEL, func: (args: any) => void) =>
    {
      const validChannels = [
        CHANNEL.ADDRESS_ADDED,
        CHANNEL.ADDRESS_READ,
        CHANNEL.ADDRESS_DELETED,
      ];
      if (validChannels.includes(channel))
      {
        ipcRenderer.on(channel, (_, ...args) => func(args));
      }
    }
  }
)
