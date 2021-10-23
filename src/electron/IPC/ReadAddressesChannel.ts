import { IpcMainEvent } from 'electron';
import { AddressBook } from '../store/AddressBook';
import { CHANNEL } from '../../shared/Channels';
import { IAddressEntry } from '../../shared/IAddressEntry';
import { IpcRequest } from '../../shared/IpcRequest';
import { IpcChannelInterface } from './IpcChannelInterface';

export class ReadAddressChannel implements IpcChannelInterface<IAddressEntry[]> {
  public readonly requestChannel = CHANNEL.GET_ADDRESSES;
  public readonly responseChannel = CHANNEL.ADDRESSES;

  constructor(private addressBook: AddressBook) {}

  public result(_: IpcMainEvent, __: IpcRequest): IAddressEntry[] {
    return this.addressBook.getAddresses();
  }
}
