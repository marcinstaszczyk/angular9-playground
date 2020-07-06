import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  forwardRef,
  HostBinding,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { SelectItem } from './SelectItem';

export type SelectableItems<Value, ItemData> = SelectItem<Value, ItemData>[] | Value[];
export type SelectSearch<Value, ItemData> = (search: string | null) => Observable<SelectableItems<Value, ItemData>>;

@Component({
  selector: 'mas-select-core[items]',
  templateUrl: './select-core.component.html',
  styleUrls: ['./select-core.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SelectCoreComponent),
    multi: true,
  }],
})
export class SelectCoreComponent<Value, Data> implements ControlValueAccessor, OnInit, AfterViewInit, OnChanges {

  @HostBinding('class') cssClass = 'mas-select-core';
  @HostBinding() tabindex = 0;
  @ViewChild(TemplateRef) defaultTemplate!: TemplateRef<{ data: Data }>;

  @Input() items!: SelectableItems<Value, Data> | Observable<SelectableItems<Value, Data>> | SelectSearch<Value, Data>;
  @Input() labelTemplate: TemplateRef<{ data: Data }> | undefined;
  @Input() placeholder = ''; // TODO keep it?

  withSearch = false;
  selectItems: SelectItem<Value, Data>[] = [];

  disabled = false;
  expanded = false;
  selectedValue: Value | undefined | null;
  selectedItem: SelectItem<Value, Data> | undefined;

  private itemsSubscription: Subscription | undefined;

  // Function to call when the rating changes.
  // noinspection JSUnusedLocalSymbols
  private onChange = (value: Value) => {};
  // Function to call when the input is touched (when a star is clicked).
  private onTouched = () => {};

  constructor(public changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    console.log(this.defaultTemplate);
  }

  ngAfterViewInit() {
    // console.log(this.defaultTemplate);
    // if (!this.labelTemplate) {
    //   this.labelTemplate = this.defaultTemplate;
    // }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.items) {
      this.setUpCurrentItems();
    }
  }

  setUpCurrentItems() {
    this.withSearch = false;
    this.cleanSubscriptions();
    if (Array.isArray(this.items)) {
      this.withSearch = false;
      this.updateSelectItems(this.items);
    } else if (typeof this.items === 'function') {
      this.withSearch = true;
      this.setUpSearch(this.items, null);
    } else {
      this.withSearch = false;
      this.itemsSubscription = this.items.subscribe((items: SelectableItems<Value, Data>) => {
        this.updateSelectItems(items);
      });
    }
  }

  toggleOptions() {
    this.expanded = !this.expanded;
    this.changeDetectorRef.detectChanges();
    if (!this.expanded) {
      this.onTouched();
    }
  }

  doSearch(event: Event) {
    this.cleanSubscriptions();
    this.setUpSearch(this.items as SelectSearch<Value, Data>, (event.target as HTMLInputElement).value);
  }

  selectItem(selectItem: SelectItem<Value, Data>) {
    this.selectedValue = selectItem.value;
    this.selectedItem = selectItem;
    this.expanded = false;
    this.changeDetectorRef.detectChanges();
    this.onChange(selectItem.value);
  }

  // ControlValueAccessor methods - start
  registerOnChange(fn: (value: Value) => {}): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(value: Value | undefined | null): void {
    this.selectedValue = value;
    this.updateSelectedItemData();
    this.changeDetectorRef.detectChanges();
  }
  // ControlValueAccessor methods - end

  private setUpSearch(itemsSearch: SelectSearch<Value, Data>, value: string | null) {
    this.itemsSubscription = itemsSearch(value).subscribe((items: SelectableItems<Value, Data>) => {
      this.updateSelectItems(items);
    });
  }

  private cleanSubscriptions() {
    if (this.itemsSubscription) {
      this.itemsSubscription.unsubscribe();
      this.itemsSubscription = undefined;
    }
  }

  private updateSelectItems(items: SelectableItems<Value, Data>) {
    if (items && items[0] instanceof SelectItem) {
      this.selectItems = items as SelectItem<Value, Data>[];
    } else {
      this.selectItems = (items as Value[] || []).map(this.convertToSelectItem);
    }
    this.changeDetectorRef.detectChanges();
  }

  private convertToSelectItem(item: Value): SelectItem<Value, Data> {
    return new SelectItem<Value, Data>(item, item as unknown as Data);
  }

  private updateSelectedItemData() {
    if (!this.selectedValue) {
      this.selectedItem = undefined;
    } else {
      this.selectedItem = this.selectItems.find(
        selectItem => this.selectedValue === selectItem.value);
    }
  }

}
