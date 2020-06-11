import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ComponentBase } from '../core/base/ComponentBase';

@Component({
  selector: 'mas-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent extends ComponentBase implements OnInit {

  form = new FormGroup({
    address: new FormGroup({}),
    aaa: new FormControl('', [Validators.required])
  });

  constructor(formBuilder: FormBuilder) {
    super();
  }

  ngOnInit(): void {
  }

}
