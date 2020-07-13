import { ComponentFactoryResolver, Directive, ElementRef, Input, OnInit, Renderer2, SkipSelf, ViewContainerRef } from '@angular/core';
import { FieldBaseComponent } from './FieldBaseComponent';
import { ValidationMessagesComponent } from '../validation-messages/validation-messages.component';

@Directive({
  selector: '[masFieldBase]',
})
export class FieldBaseDirective implements OnInit {

  @Input() masFieldBase: string | undefined;

  constructor(@SkipSelf() private readonly wrappingInput: FieldBaseComponent,
              private renderer: Renderer2,
              private inputCore: ElementRef,
              private ref: ViewContainerRef,
              private resolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
    const renderer = this.renderer;
    const wrappingInput = this.wrappingInput;

    /*
    <host class="mas-form-group">
     */
    renderer.addClass(wrappingInput.elementRef.nativeElement, 'mas-form-group');

    /*
    <label *ngIf="label"
       class="mas-form-group__label"
       [class.mas-form-group__label--required]="required"
       [for]="inputId">{{label}}</label>
    */
    if (wrappingInput.label) {
      const label = renderer.createElement('label');
      renderer.addClass(label, 'mas-form-group__label');
      if (wrappingInput.required) {
        renderer.addClass(label, 'mas-form-group__label--required');
      }
      renderer.setAttribute(label, 'for', wrappingInput.inputId);
      renderer.appendChild(label, renderer.createText(wrappingInput.label));

      renderer.insertBefore(this.inputCore.nativeElement.parentElement, label, this.inputCore.nativeElement);
    }

    /*
    <[input-text|select|etc.]
       masInputBase
       class="mas-form-group__input"
       [id]="inputId"
       [attr.name]="name"
       [attr.aria-describedby]="inputId + '--error'"
     >
     */
    renderer.addClass(this.inputCore.nativeElement, 'mas-form-group__input');
    renderer.setAttribute(this.inputCore.nativeElement, 'id', wrappingInput.inputId);
    if (wrappingInput.name) {
      renderer.setAttribute(this.inputCore.nativeElement, 'name', wrappingInput.name);
    }
    renderer.setAttribute(this.inputCore.nativeElement, 'aria-describedby', `${wrappingInput.inputId}--error`);

    /*
    <mas-validation-messages
      class="mas-form-group__error"
      [control]="control"
      [id]="inputId + '--error'"
      [validationMessages]="validationMessages">
    </mas-validation-messages>
     */
    const factory = this.resolver.resolveComponentFactory(ValidationMessagesComponent);
    const validationMessages = this.ref.createComponent(factory);
    renderer.addClass(validationMessages.location.nativeElement, 'mas-form-group__error');
    renderer.setAttribute(validationMessages.location.nativeElement, 'id', `${wrappingInput.inputId}--error`);
    validationMessages.instance.control = wrappingInput.control;
    validationMessages.instance.validationMessages = wrappingInput.validationMessages;
  }

}
