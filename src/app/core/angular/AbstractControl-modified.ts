import { AbstractControl } from '@angular/forms';
import { EventEmitter } from '@angular/core';

// tslint:disable:only-arrow-functions

const markAsTouched = AbstractControl.prototype.markAsTouched;
AbstractControl.prototype.markAsTouched = function(opts: {onlySelf?: boolean} = {}) {
  const previousTouched = this.touched;
  markAsTouched.call(this, opts);

  if (!previousTouched) {
    (this.statusChanges as EventEmitter<any>).emit(this.status);
  }
};

const markAsUntouched = AbstractControl.prototype.markAsUntouched;
AbstractControl.prototype.markAsUntouched = function(opts: {onlySelf?: boolean} = {}) {
  const previousTouched = this.touched;
  markAsUntouched.call(this, opts);

  if (previousTouched) {
    (this.statusChanges as EventEmitter<any>).emit(this.status);
  }
};

// Object.defineProperty(AbstractControl.prototype, 'hex', {
//   get() {
//     return this.__id || (this.__id = this.toHexString());
//   },
//   configurable: true,
//   enumerable: false,
// });
