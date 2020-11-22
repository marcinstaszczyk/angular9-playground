import { NgModule } from '@angular/core';

import './angular/AbstractControl-modified';
import { CoreInputsModule } from './core-inputs/core-inputs.module';
import { FormFieldsModule } from './form-fields/form-fields.module';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CoreInputsModule,
    FormFieldsModule,
  ],
  exports: [
    CommonModule,
    CoreInputsModule,
    FormFieldsModule,
  ],
})
export class CoreModule {}
