import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'mas-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent implements OnInit {

  form = new FormGroup({
    address: new FormGroup({}),
    aaa: new FormControl('', [Validators.required])
  });

  constructor(formBuilder: FormBuilder) {}

  ngOnInit(): void {
  }

}
