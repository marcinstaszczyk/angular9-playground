import { ChangeDetectorRef, DoCheck, OnDestroy } from '@angular/core';
// import { ɵmarkDirty as markDirty } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

export class BaseComponent implements DoCheck, OnDestroy {

  subscriptions: Subscription[] = [];

  ngDoCheck(): void {
    console.log('Change detection on: ', this);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  protected async<T extends BaseComponentWithChangeDetector, K extends keyof T>(this: T, property: K, observable: Observable<T[K]>): void;
  protected async<T extends BaseComponentWithChangeDetector>(this: T, observable: Observable<any>): void;
  protected async<T extends BaseComponentWithChangeDetector, K extends keyof T>(
                                                this: T, propertyOrObservable: K | Observable<any>, observable?: Observable<T[K]>): void {
    let property: K | undefined;
    if (propertyOrObservable instanceof Observable) {
      observable = propertyOrObservable;
    } else {
      property = propertyOrObservable;
    }
    this.subscriptions.push(observable!.subscribe(value => {
      if (property) {
        this[property] = value;
      }
      this.changeDetectorRef.detectChanges();
      // markDirty(this);
    }));
  }
}

type BaseComponentWithChangeDetector = { changeDetectorRef: ChangeDetectorRef } & BaseComponent;
