import { Injectable } from '@angular/core';

import { App } from '../.././interfaces/app.interface';

@Injectable()
export class BackgroundService {
  setApp(app: App | null): void {
    if (app) {
      this.setBackground(
        'https://destrostudios.com/launcher/images/background_' +
          app.id +
          '.png',
      );
    } else {
      this.reset();
    }
  }

  reset(): void {
    this.setBackground('assets/images/background.png');
  }

  private setBackground(imageUrl: string): void {
    document.body.style.backgroundImage = "url('" + imageUrl + "')";
  }
}
