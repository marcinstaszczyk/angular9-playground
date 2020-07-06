import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { BaseComponent } from '../base/BaseComponent';

@Component({
  selector: 'mas-form-status[form]',
  templateUrl: './form-status.component.html',
  styleUrls: ['./form-status.component.scss'],
})
export class FormStatusComponent extends BaseComponent implements OnInit, AfterViewInit {

  @Input() form!: AbstractControl;
  @Input() submitted = false;

  value: any;
  status!: string;

  constructor(public changeDetectorRef: ChangeDetectorRef) {
    super();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.async('value', this.form.valueChanges.pipe(
      tap(() => this.submitted = false),
    ));
    this.async('status', this.form.statusChanges);
  }

}
