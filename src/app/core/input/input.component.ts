import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Host,
  HostBinding,
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
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent extends InputBaseComponent implements OnInit, OnDestroy {

  @Input() placeholder: string | undefined;
  @HostBinding() class = 'mas-form-group';

  constructor(public changeDetectorRef: ChangeDetectorRef,
              @Optional() @Host() @SkipSelf() protected readonly parentControlContainer: ControlContainer | null) {
    super(changeDetectorRef, parentControlContainer);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

}
