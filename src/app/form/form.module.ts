import { NgModule } from '@angular/core';
import { FormComponent } from './form.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormStatusComponent } from './form-status/form-status.component';
import { TestModule } from '../test/test.module';
import { CoreModule } from '../core/core.module';

const exports = [
  FormComponent,
];

@NgModule({
  exports,
  declarations: [
    exports,
    FormStatusComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CoreModule,
    TestModule,
  ],
})
export class FormModule {}
