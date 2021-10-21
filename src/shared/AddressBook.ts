import Store from 'electron-store';
import { IAddressEntry } from './IAddressEntry';

const name = 'addresses';

export class AddressBook {
  private store = new Store<IAddressEntry>({name});
  private addresses: IAddressEntry[] = this.store.get(name);

  public getAddresses(): IAddressEntry[] {
    return this.addresses || [];
  }

  public addAddress(address: IAddressEntry): void {
    this.addresses = [...this.getAddresses(), address];
    this.saveAddresses();
  }

  public deleteAddress(address: IAddressEntry): void {
    const addresses = this.getAddresses()
    addresses.splice(addresses.indexOf(address),1);
    this.addresses = addresses;
    this.saveAddresses();
  }

  private saveAddresses(): void {
    this.store.set(name, this.addresses);
  }
}
