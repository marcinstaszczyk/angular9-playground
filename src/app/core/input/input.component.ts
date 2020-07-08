import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  forwardRef,
  Host,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  SkipSelf,
} from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { InputBaseComponent } from '../input-base/InputBaseComponent';

@Component({
  selector: 'mas-input',
  templateUrl: './input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: InputBaseComponent, useExisting: forwardRef(() => InputComponent) },
  ],
})
export class InputComponent extends InputBaseComponent implements OnInit, OnDestroy {

  @Input() placeholder: string | undefined;

  constructor(public readonly changeDetectorRef: ChangeDetectorRef,
              public readonly elementRef: ElementRef,
              @Optional() @Host() @SkipSelf() protected readonly parentControlContainer: ControlContainer | null) {
    super(changeDetectorRef, elementRef, parentControlContainer);
  }

}
