import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[board]',
})
export class BoardDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
