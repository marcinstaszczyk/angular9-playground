import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ValidationMessagesComponent } from './validation-messages/validation-messages.component';
import { FieldBaseDirective } from './field-base/field-base.directive';
import { InputTextComponent } from './input-text.component';
import { SelectComponent } from './select.component';
import { CoreInputsModule } from '../core-inputs/core-inputs.module';

export const exports = [
  InputTextComponent,
  SelectComponent,
];

@NgModule({
  exports,
  declarations: [
    ...exports,
    FieldBaseDirective,
    ValidationMessagesComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CoreInputsModule,
  ],
})
export class FormFieldsModule {}
