import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {FormControl, ValidationErrors} from '@angular/forms';
import VALIDATION_MESSAGES from './validation-messages';
import {Observable, of, merge} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'mas-validation-messages',
  templateUrl: './validation-messages.component.html',
  styleUrls: ['./validation-messages.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ValidationMessagesComponent implements OnInit {

  @Input() control: FormControl;
  @Input() label: string;

  message$: Observable<string>;

  constructor(private changeDetector: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.message$ = merge(of(1), this.control.statusChanges).pipe(
      map(this.getMessage)
    );
  }

  getMessage = () => {
    console.log('ValidationMessagesComponent.getMessage');
    if (!this.control.touched) {
      return null;
    }
    const errors = this.control.errors;
    if (!errors) {
      return null;
    }
    const errorKey = Object.keys(errors)[0];
    const messageFunction = VALIDATION_MESSAGES[errorKey] || VALIDATION_MESSAGES.DEFAULT;
    return messageFunction(this.label, errorKey, errors[errorKey]);
  }

}
