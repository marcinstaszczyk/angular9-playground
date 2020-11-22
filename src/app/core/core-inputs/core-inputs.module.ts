import { NgModule } from '@angular/core';
import { SelectCoreComponent } from './select-core/select-core.component';
import { CommonModule } from '@angular/common';

export const exports = [
  SelectCoreComponent,
];

@NgModule({
  exports,
  declarations: exports,
  imports: [
    CommonModule,
  ],
})
export class CoreInputsModule {}
