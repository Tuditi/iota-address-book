import { IpcMainEvent } from 'electron';
import { IpcRequest } from '../../shared/IpcRequest';

export interface IpcChannelInterface {
  readonly name: string;
  readonly responseChannel: string;
  result(event: IpcMainEvent, request: IpcRequest): string;
}
