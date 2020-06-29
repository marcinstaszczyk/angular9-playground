import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { BaseComponent } from '../core/base/BaseComponent';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { m, ValidationMessagesDict } from '../core/validation-messages/validation-messages';

@Component({
  selector: 'mas-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent extends BaseComponent implements OnInit {

  emailValidator = Validators.email;
  twoValidators = [Validators.minLength(5), Validators.email];

  form = new FormGroup({
    address: new FormGroup({}),
    crossValidation: new FormGroup({}),
    reactiveControl: new FormControl('', Validators.required, asyncValidator)
  });

  customValidationMessages: ValidationMessagesDict = {
    equality: m`Values in fields must match.`,
    required: m`You shall not pass ;-)`
  };

  submitted = false;

  constructor(public changeDetectorRef: ChangeDetectorRef, formBuilder: FormBuilder) {
    super();
  }

  ngOnInit(): void {
  }

  submit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      console.log('submitting');
      this.submitted = true;
      this.changeDetectorRef.detectChanges();
    }
  }

  setValue() {
    const emailControl = this.form.get('email')!;
    emailControl.setValue('Incorrect value');
    emailControl.markAsTouched();
  }

  get field1Control(): FormControl {
    return this.form.get('crossValidation')!.get('field1') as FormControl;
  }

  field1EqField2Validator: ValidatorFn = (field2Control: AbstractControl) => {
    const field1Value = this.field1Control.value;
    if (field2Control.value !== field1Value) {
      return { equality: 'error' };
    } else {
      return null;
    }
  }

}

const asyncValidator: AsyncValidatorFn = (control: AbstractControl) => {
  return of(control.value.length % 2 === 0 ? null : { evenLength: 'error' }).pipe(
    delay(1000)
  );
};
