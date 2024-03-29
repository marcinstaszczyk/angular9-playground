import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { VALIDATION_MESSAGES, ValidationMessagesDict } from './validation-messages';
import { map, startWith } from 'rxjs/operators';
import { BaseComponent } from '../../base-component/BaseComponent';

@Component({
  selector: 'mas-validation-messages[control]',
  templateUrl: './validation-messages.component.html',
  styleUrls: ['./validation-messages.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ValidationMessagesComponent extends BaseComponent implements OnInit {

  @Input() control!: UntypedFormControl;
  @Input() validationMessages: ValidationMessagesDict | undefined;

  message!: string | null;

  constructor(public changeDetectorRef: ChangeDetectorRef) {
    super();
  }

  ngOnInit(): void {
    this.async('message', this.control.statusChanges.pipe(
      startWith(1),
      map(this.getMessage),
    ));
  }

  getMessage = () => {
    const errors = this.control.errors;
    if (!errors || !this.control.touched) {
      return null;
    }
    const errorKey = Object.keys(errors)[0];
    const messageFunction = this.validationMessages && this.validationMessages[errorKey] ||
                            VALIDATION_MESSAGES[errorKey] || VALIDATION_MESSAGES.DEFAULT;
    return messageFunction(errorKey, errors[errorKey]);
  }

}
