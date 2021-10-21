import { IpcMainEvent } from 'electron';
import { CHANNEL } from '../../shared/Channel';
import { IpcRequest } from '../../shared/IpcRequest';
import { IpcChannelInterface } from './IpcChannelInterface';

export class SystemInfoChannel implements IpcChannelInterface {
  readonly requestChannel = CHANNEL.REQUEST_SYSTEM_INFO;
  readonly responseChannel = CHANNEL.GET_SYSTEM_INFO;

  result(event: IpcMainEvent, request: IpcRequest): string {
    return 'chrome v44';
  }
}
