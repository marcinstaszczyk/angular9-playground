import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BaseComponent } from './core/base/BaseComponent';

@Component({
  selector: 'mas-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent extends BaseComponent implements OnInit {

  constructor(public changeDetectorRef: ChangeDetectorRef) {
    super();
    changeDetectorRef.detach();
  }

  ngOnInit() {
    // markDirty(this);
    this.changeDetectorRef.detectChanges();
  }

}
