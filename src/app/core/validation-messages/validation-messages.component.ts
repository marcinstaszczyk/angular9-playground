import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import VALIDATION_MESSAGES from './validation-messages';
import { Observable, of, merge, interval } from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators';
import { ComponentBase } from '../base/ComponentBase';



@Component({
  selector: 'mas-validation-messages[control]',
  templateUrl: './validation-messages.component.html',
  styleUrls: ['./validation-messages.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ValidationMessagesComponent extends ComponentBase implements OnInit {

  @Input() control: FormControl;

  message$: Observable<string>;

  // counter$: Observable<number>;

  constructor(private changeDetector: ChangeDetectorRef) {
    super();
  }

  ngOnInit(): void {
    this.message$ = this.control.statusChanges.pipe(
      startWith(1),
      map(this.getMessage),
    );
    // this.counter$ = interval(1000).pipe(
    //   // tap(() => this.changeDetector.detectChanges()),
    //   // tap((value) => console.log(value))
    // );
  }

  getMessage = () => {
    // console.log('ValidationMessagesComponent.getMessage');
    const errors = this.control.errors;
    if (!errors || !this.control.touched) {
      return null;
    }
    const errorKey = Object.keys(errors)[0];
    const messageFunction = VALIDATION_MESSAGES[errorKey] || VALIDATION_MESSAGES.DEFAULT;
    return messageFunction(errorKey, errors[errorKey]);
  }

}
