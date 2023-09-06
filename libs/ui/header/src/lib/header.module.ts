import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HeaderComponent } from './components/header/header.component';

/**
 * Modulo that handle a list of components suitable for an Header.
 * @Dependencies BrowserAnimationsModule .
 * @Example import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 */
@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule,  MatToolbarModule],
  exports: [HeaderComponent]
})
export class HeaderModule {}
