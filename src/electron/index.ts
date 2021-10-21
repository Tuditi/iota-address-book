/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import electronReload from 'electron-reload';
import { IpcChannelInterface } from './IPC/IpcCHannelInterface';
import { IpcRequest } from '../shared/IpcRequest';
import { SystemInfoChannel } from './IPC/SystemInfoChannel';

electronReload(__dirname, {});

class Main {
  private window?: BrowserWindow;

  public init(ipcChannels: IpcChannelInterface[]): void {
    app.on('ready', this.createWindow);
    app.on('activate', this.onActivate);
    app.on('window-all-closed', this.onWindowAllClosed);

    this.registerIpcChannels(ipcChannels);
  }

  private async createWindow(): Promise<void> {
    this.window = new BrowserWindow({
      height: 600,
      width: 900,
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

  private registerIpcChannels(ipcChannels: IpcChannelInterface[]) {
    ipcChannels.forEach(
      channel => {
        ipcMain.on(channel.name, (event, request: IpcRequest) =>
        {
          event.sender.send(
            channel.responseChannel,
            channel.result(event, request)
          );
        });
      }
    )
  }
}

(new Main()).init([
  new SystemInfoChannel(),
]);
