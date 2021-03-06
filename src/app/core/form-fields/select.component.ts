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
  TemplateRef,
} from '@angular/core';
import { FieldBaseComponent } from './field-base/FieldBaseComponent';
import { ControlContainer } from '@angular/forms';
import { Observable } from 'rxjs';
import { SelectableItems, SelectSearch } from '../core-inputs/select-core/select-core.component';

@Component({
  selector: 'mas-select[items]',
  template: `
    <mas-select-core
      [masFieldBase]
      [items]="items"
      [formControl]="control"
      [labelTemplate]="labelTemplate"
      [placeholder]="placeholder"
    ></mas-select-core>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: FieldBaseComponent, useExisting: forwardRef(() => SelectComponent) },
  ],
})
export class SelectComponent<Value, Data> extends FieldBaseComponent implements OnInit, OnDestroy {

  @Input() placeholder: string | undefined;
  @Input() items!: SelectableItems<Value, Data> | Observable<SelectableItems<Value, Data>> | SelectSearch<Value, Data>;
  @Input() labelTemplate: TemplateRef<{ data: Data }> | undefined;

  constructor(public changeDetectorRef: ChangeDetectorRef,
              public readonly elementRef: ElementRef,
              @Optional() @Host() @SkipSelf() protected readonly parentControlContainer: ControlContainer | null) {
    super(changeDetectorRef, elementRef, parentControlContainer);
  }

}
