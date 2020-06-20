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

  protected async<T extends BaseComponentWithChangeDetector, K extends keyof T>(this: T, property: K, observable: Observable<T[K]>) {
    this.subscriptions.push(observable.subscribe(value => {
      this[property] = value;
      this.changeDetectorRef.detectChanges();
      // markDirty(this);
    }));
  }
}

type BaseComponentWithChangeDetector = { changeDetectorRef: ChangeDetectorRef } & BaseComponent;
