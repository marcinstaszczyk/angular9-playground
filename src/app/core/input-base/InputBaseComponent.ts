import { ChangeDetectorRef, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractFormGroupDirective,
  ControlContainer,
  FormArrayName,
  FormControl,
  FormGroup,
  FormGroupDirective,
  FormGroupName, ValidatorFn,
  Validators,
} from '@angular/forms';
import { BaseComponent } from '../base/BaseComponent';
import { tap } from 'rxjs/operators';
import { ValidationMessagesDict } from '../validation-messages/validation-messages';

let inputCounter = 0;

export class InputBaseComponent extends BaseComponent implements OnInit, OnDestroy {

  @Input() inputId = `input${(inputCounter = inputCounter + 1)}`;
  @Input() name: string | undefined;
  @Input() label: string | undefined;
  @Input() controlName: string | undefined;
  @Input() formGroup: FormGroup | undefined;
  @Input() required: boolean | undefined;
  @Input() disabled: boolean | undefined;
  @Input() validators: ValidatorFn | ValidatorFn[] | undefined;
  @Input() validationDependencies: FormControl | FormControl[] | undefined;
  @Input() validationMessages: ValidationMessagesDict | undefined;

  control!: FormControl;

  private controlSelfAdded = false;

  constructor(public readonly changeDetectorRef: ChangeDetectorRef,
              public readonly elementRef: ElementRef,
              protected readonly parentControlContainer: ControlContainer | null,
              ) {
    super();
  }

  ngOnInit(): void {
    this.validateInputParameters();
    this.initFormGroup();
    this.initFormControl();
    this.initValidityState();
    this.initValidationDependencies();
  }

  ngOnDestroy(): void {
    if (this.controlSelfAdded) {
      this.formGroup!.removeControl(this.formControlName);
    }
  }

  private validateInputParameters(): void {
    if (!this.name && !this.controlName) {
      throw new Error('Attribute "name" or "controlName" for "mas-input-..." is required');
    }
  }

  private initFormGroup(): void {
    if (!this.formGroup) {
      this.formGroup = this.getFormGroupFromParent();
    }
  }

  private getFormGroupFromParent(): FormGroup | undefined {
    if (this.parentControlContainer instanceof FormGroupDirective) {
      return this.parentControlContainer.form;
    }
    if (this.parentControlContainer instanceof FormGroupName) {
      return this.parentControlContainer.control;
    }

    return undefined;
  }

  private initFormControl(): void {
    const controlName = this.formControlName;
    if (!this.control) {
      if (this.formGroup && this.formGroup.contains(controlName)) {
        const control = this.formGroup.get(controlName);
        if (control instanceof FormControl) {
          this.control = control;
        } else {
          throw new Error(`Control found for name '${controlName}' is not instance of FormControl.`);
        }
      } else {
        this.control = this.buildFormControl();
      }
    }

    if (this.formGroup && !this.formGroup.contains(controlName)) {
      this.controlSelfAdded = true;
      this.formGroup.addControl(this.formControlName, this.control);
    }
  }

  private get formControlName(): string {
    return (this.controlName || this.name)!;
  }

  private buildFormControl(): FormControl {
    let validators: ValidatorFn[] = [];
    if (this.required && validators.indexOf(Validators.required) === -1) {
      validators.push(Validators.required);
    }
    if (Array.isArray(this.validators)) {
      validators = validators.concat(this.validators);
    } else if (this.validators) {
      validators.push(this.validators);
    }

    return new FormControl('', validators);
  }

  private initValidityState(): void {
    this.async(this.control.statusChanges);
  }

  private initValidationDependencies(): void {
    if (this.validationDependencies) {
      const dependencies = Array.isArray(this.validationDependencies) ? this.validationDependencies : [this.validationDependencies];
      dependencies.forEach((dependency: FormControl) => {
        this.async(dependency.valueChanges.pipe(
          tap(() => {
            this.control.updateValueAndValidity();
          }),
        ));
      });
    }
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
}
