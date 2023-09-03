import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalErrorInterceptor } from './interceptor/globar-error.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './interceptor/token.interceptor';

@NgModule({
  imports: [CommonModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: GlobalErrorInterceptor, multi: true },
  ]
})
export class CoreModule {}
