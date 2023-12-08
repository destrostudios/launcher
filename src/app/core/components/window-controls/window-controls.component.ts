import { Component } from '@angular/core';

import { IpcService } from '../../services/ipc/ipc.service';

@Component({
  selector: 'ds-window-controls',
  templateUrl: './window-controls.component.html',
  styleUrls: ['./window-controls.component.scss'],
})
export class WindowControlsComponent {
  constructor(private ipcService: IpcService) {}

  minimizeWindow(): void {
    this.ipcService.send('minimizeWindow');
  }

  closeWindow(): void {
    this.ipcService.send('closeWindow');
  }
}
