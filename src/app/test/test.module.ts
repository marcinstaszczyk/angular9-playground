import { NgModule } from '@angular/core';
import { HeavyComponent } from './heavy/heavy.component';
import { Heavy2Component } from './heavy2/heavy2.component';

const exports = [
  HeavyComponent,
  Heavy2Component,
];

@NgModule({
  exports,
  declarations: exports,
})
export class TestModule {}
