import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { BaseComponent } from '../../core/base/BaseComponent';

@Component({
  selector: 'mas-heavy',
  styleUrls: ['./heavy.component.scss'],
  templateUrl: './heavy.component.html',
})
export class HeavyComponent extends BaseComponent implements OnInit {

  value = 0;

  constructor(private renderer: Renderer2, private el: ElementRef) {
    super();
  }

  ngOnInit(): void {
    const div = this.renderer.createElement('div');
    this.renderer.setStyle(div, 'visibility', 'hidden');
    for (let i = 0; i < 100000; i = i + 1) {
      const item = this.renderer.createElement('div');
      const text = this.renderer.createText('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
      this.renderer.appendChild(item, text);
      this.renderer.appendChild(div, item);
    }
    this.renderer.appendChild(this.el.nativeElement, div);
  }

  increase() {
    this.value = this.value + 1;
  }

}
