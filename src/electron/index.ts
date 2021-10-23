/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import electronReload from 'electron-reload';
import { IpcChannelInterface } from './IPC/IpcChannelInterface';
import { IpcRequest } from '../shared/IpcRequest';
import { AddressBook } from './store/AddressBook';
import { AddAddressChannel } from './IPC/AddAddressChannel';
import { DeleteAddressChannel } from './IPC/DeleteAddressChannel';
import { ReadAddressChannel } from './IPC/ReadAddressesChannel';


electronReload(__dirname, {});
const addressBook = new AddressBook();

class Main {
  private window?: BrowserWindow;

  public init(ipcChannels: IpcChannelInterface<unknown>[]): void {
    app.on('ready', this.createWindow);
    app.on('activate', this.onActivate);
    app.on('window-all-closed', this.onWindowAllClosed);

    this.registerIpcChannels(ipcChannels);
  }

  private async createWindow(): Promise<void> {
    this.window = new BrowserWindow({
      height: 900,
      width: 1200,
      webPreferences: {
        nodeIntegration: true,
        preload: path.join(__dirname, 'preload.js')
      },
    });

    await this.window.loadFile(path.join(__dirname, '../index.html'));
    this.window.webContents.openDevTools({mode: 'bottom'});
  }

  private async onActivate(): Promise<void> {
    if (BrowserWindow.getAllWindows().length === 0) {
      await this.createWindow();
    }
  }

  private onWindowAllClosed(): void {
    // Native macOS behavior
    if (process.platform !== 'darwin') {
      app.quit();
    }
  }

  private registerIpcChannels(ipcChannels: IpcChannelInterface<unknown>[]) {
    ipcChannels.forEach(
      channel => {
        ipcMain.on(channel.requestChannel, async (event, request: IpcRequest) =>
        {
          const result = await channel.result(event, request);
          event.sender.send(
            channel.responseChannel,
            result
          );
        });
      }
    )
  }
}

(new Main()).init([
  new AddAddressChannel(addressBook),
  new DeleteAddressChannel(addressBook),
  new ReadAddressChannel(addressBook),
]);
