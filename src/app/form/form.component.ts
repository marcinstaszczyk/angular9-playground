import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from '../core/base/BaseComponent';

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

  constructor(public changeDetectorRef: ChangeDetectorRef, formBuilder: FormBuilder) {
    super();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.async('value', this.form.valueChanges);
  }


}
