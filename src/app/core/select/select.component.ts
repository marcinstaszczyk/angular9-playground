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
import { InputBaseComponent } from '../input-base/InputBaseComponent';
import { ControlContainer } from '@angular/forms';
import { Observable } from 'rxjs';
import { SelectableItems, SelectSearch } from '../select-core/select-core.component';

@Component({
  selector: 'mas-select[items]',
  templateUrl: './select.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: InputBaseComponent, useExisting: forwardRef(() => SelectComponent) },
  ],
})
export class SelectComponent<Value, Data> extends InputBaseComponent implements OnInit, OnDestroy {

  @Input() placeholder: string | undefined;
  @Input() items!: SelectableItems<Value, Data> | Observable<SelectableItems<Value, Data>> | SelectSearch<Value, Data>;
  @Input() labelTemplate: TemplateRef<{ data: Data }> | undefined;

  constructor(public changeDetectorRef: ChangeDetectorRef,
              public readonly elementRef: ElementRef,
              @Optional() @Host() @SkipSelf() protected readonly parentControlContainer: ControlContainer | null) {
    super(changeDetectorRef, elementRef, parentControlContainer);
  }

}
