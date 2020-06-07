import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { InputComponent } from './core/input/input.component';
import { FormComponent } from './form/form.component';
import { ValidationMessagesComponent } from './core/validation-messages/validation-messages.component';

@NgModule({
  declarations: [
    AppComponent,
    InputComponent,
    FormComponent,
    ValidationMessagesComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
