/* eslint-disable @typescript-eslint/no-explicit-any */
import { contextBridge, ipcRenderer } from 'electron';
import { CHANNEL } from '../shared/Channels';

contextBridge.exposeInMainWorld(
  'api', {
    send: (channel: CHANNEL, data: any) =>
    {
      const validChannels = [
        CHANNEL.ADD_ADDRESS,
        CHANNEL.GET_ADDRESSES,
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
        CHANNEL.ADDRESSES,
        CHANNEL.ADDRESS_DELETED,
      ];
      if (validChannels.includes(channel))
      {
        ipcRenderer.on(channel, (_, ...args) => func(args));
      }
    }
  }
)
