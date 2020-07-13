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
import { FieldBaseComponent } from '../field-base/FieldBaseComponent';

@Component({
  selector: 'mas-input-text',
  templateUrl: './input-text.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: FieldBaseComponent, useExisting: forwardRef(() => InputTextComponent) },
  ],
})
export class InputTextComponent extends FieldBaseComponent implements OnInit, OnDestroy {

  @Input() placeholder: string | undefined;

  constructor(public readonly changeDetectorRef: ChangeDetectorRef,
              public readonly elementRef: ElementRef,
              @Optional() @Host() @SkipSelf() protected readonly parentControlContainer: ControlContainer | null) {
    super(changeDetectorRef, elementRef, parentControlContainer);
  }

}
