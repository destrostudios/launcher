import { Injectable, NgZone } from '@angular/core';

import { IpcRenderer, IpcRendererEvent } from 'electron';

@Injectable()
export class IpcService {
  private ipcRenderer: IpcRenderer;

  constructor(private ngZone: NgZone) {
    this.ipcRenderer = window.require('electron').ipcRenderer;
  }

  on(
    channel: string,
    listener: (event: IpcRendererEvent, ...args: any[]) => void,
  ): void {
    this.ipcRenderer.on(channel, (event, ...args) => {
      this.ngZone.run(() => {
        listener(event, ...args);
      });
    });
  }

  send(channel: string, ...args: any[]): void {
    this.ipcRenderer.send(channel, ...args);
  }
}
