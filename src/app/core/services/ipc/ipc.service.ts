import { Injectable } from '@angular/core';

import { IpcRenderer, IpcRendererEvent } from 'electron';

@Injectable()
export class IpcService {

  private ipcRenderer: IpcRenderer;

  constructor() {
    this.ipcRenderer = window.require('electron').ipcRenderer;
  }

  on(channel: string, listener: (event: IpcRendererEvent, ...args: any[]) => void): void {
    this.ipcRenderer.on(channel, listener);
  }

  send(channel: string, ...args: any[]): void {
    this.ipcRenderer.send(channel, ...args);
  }
}
