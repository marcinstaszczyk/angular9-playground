import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from '../core/base/BaseComponent';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'mas-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent extends BaseComponent implements OnInit, AfterViewInit {

  form = new FormGroup({
    address: new FormGroup({}),
  });

  value: any;
  submitted = false;

  constructor(public changeDetectorRef: ChangeDetectorRef, formBuilder: FormBuilder) {
    super();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.async('value', this.form.valueChanges.pipe(
      tap(() => this.submitted = false)
    ));
  }

  submit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      console.log('submitting');
      this.submitted = true;
      this.changeDetectorRef.detectChanges();
    }
  }

}
