import { DoCheck } from '@angular/core';

export class ComponentBase implements DoCheck {

  ngDoCheck(): void {
    console.log('Change detection on: ', this);
  }

}
