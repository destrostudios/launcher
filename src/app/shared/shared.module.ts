import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { AppHubComponent } from './components/app-hub/app-hub.component';
import { FormComponent } from './components/form/form.component';
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
    AppHubComponent,
    FormComponent,
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

    AppHubComponent,
    FormComponent,
    LoadingSpinnerComponent,
    ModalComponent,
    SpinnerButtonComponent,
  ],
})
export class SharedModule {}
