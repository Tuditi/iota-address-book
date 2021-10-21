import { IpcMainEvent } from 'electron';
import { IpcRequest } from '../../shared/IpcRequest';

export interface IpcChannelInterface<T> {
  readonly requestChannel: string;
  readonly responseChannel: string;
  result(event: IpcMainEvent, request: IpcRequest): T | PromiseLike<T>;
}
