import { Directive, Input, ViewContainerRef, TemplateRef, EmbeddedViewRef } from '@angular/core';

@Directive({selector: '[appContext]'})
export class ContextDirective {

  private view: EmbeddedViewRef<any>;

  @Input() set appContextFrom(context) {
    if (!this.view) {
      this.view = this.viewContainer.createEmbeddedView(this.template);
    }
    this.view.context.$implicit = context;
  }

  constructor(private viewContainer: ViewContainerRef, private template: TemplateRef<any>) {}

}
