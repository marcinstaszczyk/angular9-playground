import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { InputTextComponent } from './core/form-fields/input-text/input-text.component';
import { FormComponent } from './form/form.component';
import { ValidationMessagesComponent } from './core/form-fields/validation-messages/validation-messages.component';
import './core/angular/AbstractControl-modified';
import { HeavyComponent } from './test/heavy/heavy.component';
import { Heavy2Component } from './test/heavy2/heavy2.component';
import { FormStatusComponent } from './core/form/form-status/form-status.component';
import { SelectCoreComponent } from './core/core-inputs/select-core/select-core.component';
import { FieldBaseDirective } from './core/form-fields/field-base/field-base.directive';
import { SelectComponent } from './core/form-fields/select/select.component';

@NgModule({
  declarations: [
    AppComponent,
    InputTextComponent,
    FormComponent,
    ValidationMessagesComponent,
    HeavyComponent,
    Heavy2Component,
    FormStatusComponent,
    SelectCoreComponent,
    FieldBaseDirective,
    SelectComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
  ],
  providers: [],
  entryComponents: [
    ValidationMessagesComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
