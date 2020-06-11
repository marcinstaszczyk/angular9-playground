import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ComponentBase } from './core/base/ComponentBase';

@Component({
  selector: 'mas-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent extends ComponentBase implements OnInit {

  constructor(private changeDetectorRef: ChangeDetectorRef) {
    super();
    changeDetectorRef.detach();
  }

  ngOnInit() {
    this.changeDetectorRef.detectChanges();
  }

}
