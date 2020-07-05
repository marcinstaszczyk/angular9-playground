import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { BaseComponent } from '../core/base/BaseComponent';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { m, ValidationMessagesDict } from '../core/validation-messages/validation-messages';
import { SelectSearch } from '../core/select-core/select-core.component';
import { SelectItem } from '../core/select-core/SelectItem';
import { User } from '../data/User';
import USERS from '../data/Users';

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
    reactiveControl: new FormControl('', Validators.required, asyncValidator),
    selectText: new FormControl(),
    selectWithIcon: new FormControl(),
  });

  customValidationMessages: ValidationMessagesDict = {
    equality: m`Values in fields must match.`,
    required: m`You shall not pass ;-)`
  };

  submitted = false;

  allItems: string[] = generateAllSelectItems();
  userItems: SelectItem<number, User>[] = generateAllUserSelectItems();

  constructor(public changeDetectorRef: ChangeDetectorRef) {
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


  selectItems: SelectSearch<string, string> = (search: string | null) => {
    let result;
    if (!search) {
      result = of(this.allItems);
    } else {
      result = of(this.allItems.filter(item => item.includes(search)));
    }

    return result.pipe(
      delay(500)
    );
  }

  selectUserItems: SelectSearch<number, User> = (search: string | null) => {
    if (!search) {
      return of(this.userItems);
    } else {
      // TODO "got you" that SelectableItem type is not working here
      return of(this.userItems.filter(item => item.data.name.includes(search)));
    }
  }

}

const asyncValidator: AsyncValidatorFn = (control: AbstractControl) => {
  return of(control.value.length % 2 === 0 ? null : { evenLength: 'error' }).pipe(
    delay(1000)
  );
};

function generateAllSelectItems(): string[] {
  const result: string[] = [];
  for (let i = 0; i < 100; ++i) {
    result[i] = 'item' + i;
  }

  return result;
}

function generateAllUserSelectItems(): SelectItem<number, User>[] {
  return USERS.map(user => new SelectItem(user.id, user));
}
