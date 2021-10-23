import { IpcMainEvent } from 'electron';
import { AddressBook } from '../store/AddressBook';
import { CHANNEL } from '../../shared/Channels';
import { IpcRequest } from '../../shared/IpcRequest';
import { IpcChannelInterface } from './IpcChannelInterface';

export class DeleteAddressChannel implements IpcChannelInterface<void> {
  public readonly requestChannel = CHANNEL.DELETE_ADDRESS;
  public readonly responseChannel = CHANNEL.ADDRESS_DELETED;

  constructor(private addressBook: AddressBook) {}

  public result(_: IpcMainEvent, request: IpcRequest): void {
    if (request.data || request.data === 0) {
      this.addressBook.deleteAddress(request.data as number);
    }
  }
}
