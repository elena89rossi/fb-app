import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../card/src/lib/components/card/card/card.component';

@NgModule({
  imports: [CommonModule],
  declarations: [CardComponent],
  exports: [],
})
export class UiModule {}
