import { AsyncPipe } from '@angular/common';

// @ts-ignore
// tslint:disable-next-line:ban-types
AsyncPipe.prototype._updateLatestValue = function(async: any, value: Object) {
  if (async === this._obj) {
    this._latestValue = value;
    this._ref.detectChanges();
  }
};
