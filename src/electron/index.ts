/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import electronReload from 'electron-reload';

electronReload(__dirname, {});

class Main {
  private window!: BrowserWindow;

  public init(): void {
    app.on('ready', this.createWindow);
    app.on('activate', this.onActivate);
    app.on('window-all-closed', this.onWindowAllClosed);
  }

  private async createWindow(): Promise<void> {
    this.window = new BrowserWindow({
      height: 600,
      width: 900,
      webPreferences: {
        nodeIntegration: true,
      },
    });

    await this.window.loadFile(path.join(__dirname, 'dist', '../index.html'));
    this.window.webContents.openDevTools();
  }

  private async onActivate(): Promise<void> {
    if (BrowserWindow.getAllWindows().length === 0) {
      await this.createWindow();
    }
  }

  private onWindowAllClosed(): void {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  }
}

(new Main()).init();
