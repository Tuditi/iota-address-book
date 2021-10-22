import { IpcMainEvent } from 'electron';
import { AddressBook } from '../../shared/AddressBook';
import { CHANNEL } from '../../shared/Channel';
import { IAddressEntry } from '../../shared/IAddressEntry';
import { IpcRequest } from '../../shared/IpcRequest';
import { IpcChannelInterface } from './IpcChannelInterface';

export class AddAddressChannel implements IpcChannelInterface<IAddressEntry[]> {
  public readonly requestChannel = CHANNEL.ADD_ADDRESS;
  public readonly responseChannel = CHANNEL.ADDRESS_READ;

  constructor(private addressBook: AddressBook) {}

  public result(_: IpcMainEvent, request: IpcRequest): IAddressEntry[] {
    if (request.data) {
      this.addressBook.addAddress(request.data as IAddressEntry);
    }
    return this.addressBook.getAddresses()
  }
}
