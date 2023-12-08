import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { ModalComponent } from './components/modal/modal.component';
import { SpinnerButtonComponent } from './components/spinner-button/spinner-button.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,

    TranslateModule,
  ],
  declarations: [
    LoadingSpinnerComponent,
    ModalComponent,
    SpinnerButtonComponent,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    TranslateModule,

    LoadingSpinnerComponent,
    ModalComponent,
    SpinnerButtonComponent,
  ],
})
export class SharedModule {}
