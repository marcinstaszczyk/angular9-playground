import {ChangeDetectionStrategy, Component, Host, Input, OnDestroy, OnInit, Optional, SkipSelf} from '@angular/core';
import {
  AbstractFormGroupDirective,
  ControlContainer,
  FormArrayName,
  FormControl,
  FormGroup,
  FormGroupDirective,
  FormGroupName,
  Validators
} from '@angular/forms';

let inputCounter = 0;

@Component({
  selector: 'mas-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent implements OnInit, OnDestroy {

  @Input() id = 'input' + ++inputCounter;
  @Input() name;
  @Input() controlName;
  @Input() label;
  @Input() formGroup: FormGroup;
  @Input() disabled: boolean;

  control: FormControl;
  private controlSelfAdded = false;

  constructor(@Optional() @Host() @SkipSelf() private parentControlContainer: ControlContainer) { }

  ngOnInit(): void {
    if (!this.name && !this.controlName) {
      throw new Error('Attribute "name" or "controlName" for "mas-input" is required');
    }
    this.control = new FormControl('', [Validators.required, Validators.minLength(2), Validators.email]);
    // this.control.registerOnChange(this.onInputChange);
    // if (this.formGroup) {
    //   this.formGroup.addControl(this.name, this.control);
    // }
    const formGroup = this.formGroupOrParent;
    if (formGroup && !formGroup.contains(this.formControlName)) {
      // this._setUpControl();
      this.controlSelfAdded = true;
      formGroup.addControl(this.formControlName, this.control);
    }
  }

  get formControlName() {
    return this.controlName || this.name;
  }

  ngOnDestroy(): void {
    if (this.controlSelfAdded && this.formGroupOrParent) {
      this.formGroupOrParent.removeControl(this.name);
    }
  }

  get formGroupOrParent(): FormGroup {
    if (this.formGroup) {
      return this.formGroup;
    } else if (this.parentControlContainer instanceof FormGroupDirective) {
      return this.parentControlContainer.form;
    } else if (this.parentControlContainer instanceof FormGroupName) {
      return this.parentControlContainer.control;
    }

    return null;
  }

  // get formDirective(): any {
  //   return this.parentControlContainer ? this.parentControlContainer.formDirective : null;
  // }

  // private _checkParentType(): void {
  //   if (!(this.parentControlContainer instanceof FormGroupName) &&
  //     this.parentControlContainer instanceof AbstractFormGroupDirective) {
  //     throw new Error('ReactiveErrors.ngModelGroupException'); // ReactiveErrors.ngModelGroupException();
  //   } else if (
  //     !(this.parentControlContainer instanceof FormGroupName) && !(this.parentControlContainer instanceof FormGroupDirective) &&
  //     !(this.parentControlContainer instanceof FormArrayName)) {
  //     throw new Error('ReactiveErrors.controlParentExceptionn'); // ReactiveErrors.controlParentException();
  //   }
  // }

  // private _setUpControl() {
  //   this._checkParentType();
  //   // (this as {control: FormControl}).control = this.formDirective.addControl(this);
  //   (this as {control: FormControl}).control = this.formDirective.addControl(this.name, this.control);
  //   if (this.control.disabled) {
  //     this.disabled = true;
  //   }
  // }

  // onInputChange() {
  //
  // }
}
