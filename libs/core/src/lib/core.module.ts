import { ErrorHandler, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalErrorInterceptor } from './global-error/interceptors/globar-error.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './interceptor/token.interceptor';
import { CustomSnackBarComponent } from './notifications/components/custom-snackbar.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { GlobalErrorHandlerService } from './global-error/services/global-error-handler.service';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  imports: [CommonModule, MatSnackBarModule, MatButtonModule],
  providers: [
    { provide: ErrorHandler, useClass: GlobalErrorHandlerService },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GlobalErrorInterceptor,
      multi: true,
    },
  ],
  declarations: [CustomSnackBarComponent,],
})
export class CoreModule {}
