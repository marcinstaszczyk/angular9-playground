import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { BaseComponent } from '../../core/base-component/BaseComponent';

@Component({
  selector: 'mas-heavy2[depth]',
  templateUrl: './heavy2.component.html',
  styleUrls: ['./heavy2.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Heavy2Component extends BaseComponent implements OnInit {

  @Input() depth!: number;

  value = 0;

  constructor() {
    super();
  }

  ngOnInit(): void {
    // setInterval(() => {
    //   this.value = this.value + 1;
    // });
  }

}
