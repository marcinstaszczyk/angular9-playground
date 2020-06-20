import { AsyncPipe } from '@angular/common';
// import { ViewRef } from '@angular/core';
// import { ɵmarkDirty as markDirty } from '@angular/core';

// @ts-ignore
// tslint:disable-next-line:ban-types
AsyncPipe.prototype._updateLatestValue = function(async: any, value: Object) {
  // @ts-ignore
  if (async === this._obj) {
    // @ts-ignore
    this._latestValue = value;
    // markDirty(this);
    // @ts-ignore
    this._ref.detectChanges();
  }
};

// // tslint:disable:only-arrow-functions
// const detectChanges = ViewRef.prototype.detectChanges;
// ViewRef.prototype.detectChanges = function() {
//   console.log('ChangeDetectorRef.detectChanges', this);
//   detectChanges();
// };
