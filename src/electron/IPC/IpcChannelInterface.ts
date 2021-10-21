import { IpcMainEvent } from 'electron';
import { IpcRequest } from '../../shared/IpcRequest';

export interface IpcChannelInterface {
  readonly requestChannel: string;
  readonly responseChannel: string;
  // TODO: use generics result<T>
  result(event: IpcMainEvent, request: IpcRequest): string | PromiseLike<string>;
}
