import { IpcMainEvent } from 'electron';
import { IpcRequest } from '../../shared/IpcRequest';
import { IpcChannelInterface } from './IpcChannelInterface';

export class SystemInfoChannel implements IpcChannelInterface {
  readonly name = 'requestSystemInfo';
  readonly responseChannel = 'getSystemInfo';

  result(event: IpcMainEvent, request: IpcRequest): string {
    return 'chrome v44';
  }
}
