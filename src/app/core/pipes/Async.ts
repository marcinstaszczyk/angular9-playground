/* tslint:disable */
import {ChangeDetectorRef, OnDestroy, Pipe, WrappedValue} from '@angular/core';

interface SubscriptionStrategy {
  createSubscription(async: any, updateLatestValue: any): any;
  dispose(subscription: any): void;
  onDestroy(subscription: any): void;
}

class ObservableStrategy implements SubscriptionStrategy {
  createSubscription(async: any, updateLatestValue: any): any {
    return async.subscribe({next: updateLatestValue, error: (e: any) => { throw e; }});
  }

  dispose(subscription: any): void { subscription.unsubscribe(); }

  onDestroy(subscription: any): void { subscription.unsubscribe(); }
}

class PromiseStrategy implements SubscriptionStrategy {
  createSubscription(async: Promise<any>, updateLatestValue: (v: any) => any): any {
    return async.then(updateLatestValue, e => { throw e; });
  }

  dispose(subscription: any): void {}

  onDestroy(subscription: any): void {}
}

const _promiseStrategy = new PromiseStrategy();
const _observableStrategy = new ObservableStrategy();

@Pipe({name: 'async2', pure: false})
export class AsyncPipe2 implements OnDestroy {
  private _latestValue: Object = null;
  private _latestReturnedValue: Object = null;

  private _subscription: Object = null;
  private _obj: any = null;
  private _strategy: SubscriptionStrategy = null;

  constructor(private _ref: ChangeDetectorRef) {}

  ngOnDestroy(): void {
    if (this._subscription) {
      this._dispose();
    }
  }

  transform(obj: any): any {
    if (!this._obj) {
      if (obj) {
        this._subscribe(obj);
      }
      this._latestReturnedValue = this._latestValue;
      return this._latestValue;
    }

    if (obj !== this._obj) {
      this._dispose();
      return this.transform(obj);
    }

    if (this._latestValue === this._latestReturnedValue) {
      return this._latestReturnedValue;
    }

    this._latestReturnedValue = this._latestValue;
    return WrappedValue.wrap(this._latestValue);
  }

  private _subscribe(obj: any): void {
    this._obj = obj;
    this._strategy = this._selectStrategy(obj);
    this._subscription = this._strategy.createSubscription(
      obj, (value: Object) => this._updateLatestValue(obj, value));
  }

  private _selectStrategy(obj:any): any {

    if ((<any>obj).subscribe) {
      return _observableStrategy;
    }

    throw new Error(obj);
  }

  private _dispose(): void {
    this._strategy.dispose(this._subscription);
    this._latestValue = null;
    this._latestReturnedValue = null;
    this._subscription = null;
    this._obj = null;
  }

  private _updateLatestValue(async: any, value: Object) {
    if (async === this._obj) {
      this._latestValue = value;
      this._ref.detectChanges();
    }
  }
}
