import { NgModule } from '@angular/core';
import { CommonModule }from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContextDirective } from './context/context.directive';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    ContextDirective,
  ],
  exports: [
    ContextDirective,
    CommonModule,
    FormsModule,
  ]
})
export class SharedModule { }
