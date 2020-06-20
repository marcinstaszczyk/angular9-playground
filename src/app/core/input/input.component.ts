import {
  ChangeDetectionStrategy,
  Component,
  Host,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  SkipSelf
} from '@angular/core';
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
import { BaseComponent } from '../base/BaseComponent';

let inputCounter = 0;

@Component({
  selector: 'mas-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent extends BaseComponent implements OnInit, OnDestroy {

  @Input() id = 'input' + ++inputCounter;
  @Input() name: string | undefined;
  @Input() controlName: string | undefined;
  @Input() label: string | undefined;
  @Input() formGroup: FormGroup | undefined;
  @Input() disabled: boolean | undefined;

  control!: FormControl;

  private controlSelfAdded = false;

  constructor(@Optional() @Host() @SkipSelf() private readonly parentControlContainer: ControlContainer | null) {
    super();
  }

  ngOnInit(): void {
    this.validateInputParameters();
    this.initFormGroup();
    this.initFormControl();
  }

  ngOnDestroy(): void {
    if (this.controlSelfAdded) {
      this.formGroup!.removeControl(this.formControlName);
    }
  }

  private validateInputParameters() {
    if (!this.name && !this.controlName) {
      throw new Error('Attribute "name" or "controlName" for "mas-input" is required');
    }
  }

  private initFormGroup() {
    if (!this.formGroup) {
      this.formGroup = this.getFormGroupFromParent();
    }
  }

  private getFormGroupFromParent(): FormGroup | undefined {
    if (this.parentControlContainer instanceof FormGroupDirective) {
      return this.parentControlContainer.form;
    } else if (this.parentControlContainer instanceof FormGroupName) {
      return this.parentControlContainer.control;
    }

    return undefined;
  }

  private initFormControl() {
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
        this.control = new FormControl('', [Validators.required, Validators.minLength(2), Validators.email]);
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
