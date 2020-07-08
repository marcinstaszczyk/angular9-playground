import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { InputComponent } from './core/input/input.component';
import { FormComponent } from './form/form.component';
import { ValidationMessagesComponent } from './core/validation-messages/validation-messages.component';
import './core/angular/AbstractControl-modified';
import { HeavyComponent } from './test/heavy/heavy.component';
import { Heavy2Component } from './test/heavy2/heavy2.component';
import { FormStatusComponent } from './core/form-status/form-status.component';
import { SelectCoreComponent } from './core/select-core/select-core.component';
import { InputBaseDirective } from './core/input-base/input-base.directive';
import { SelectComponent } from './core/select/select.component';

@NgModule({
  declarations: [
    AppComponent,
    InputComponent,
    FormComponent,
    ValidationMessagesComponent,
    HeavyComponent,
    Heavy2Component,
    FormStatusComponent,
    SelectCoreComponent,
    InputBaseDirective,
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
