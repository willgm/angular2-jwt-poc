import { Directive, Input, ViewContainerRef, TemplateRef, EmbeddedViewRef, OnChanges } from '@angular/core';

@Directive({selector: '[context][contextOn]'})
export class ContextDirective implements OnChanges {
  @Input() contextOn: any;

  private view: EmbeddedViewRef<any>;

  constructor(private viewContainer: ViewContainerRef, private template: TemplateRef<any>) {}

  ngOnChanges(state) {
    if (!this.view) {
      this.view = this.viewContainer.createEmbeddedView(this.template);
    }
    this.view.context.$implicit = state.contextOn.currentValue;
  }

}
