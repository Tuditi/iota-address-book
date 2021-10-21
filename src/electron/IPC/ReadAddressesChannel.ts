import { IpcMainEvent } from 'electron';
import { AddressBook } from '../../shared/AddressBook';
import { CHANNEL } from '../../shared/Channel';
import { IAddressEntry } from '../../shared/IAddressEntry';
import { IpcRequest } from '../../shared/IpcRequest';
import { IpcChannelInterface } from './IpcChannelInterface';

export class ReadAddressChannel implements IpcChannelInterface<IAddressEntry[]> {
  public readonly requestChannel = CHANNEL.READ_ADDRESSES;
  public readonly responseChannel = CHANNEL.ADDRESS_READ;

  constructor(private addressBook: AddressBook) {}

  public result(_: IpcMainEvent, __: IpcRequest): IAddressEntry[] {
    return this.addressBook.getAddresses();
  }
}
