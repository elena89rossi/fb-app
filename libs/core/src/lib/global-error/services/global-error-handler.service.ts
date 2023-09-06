
import { Injectable } from '@angular/core';
import { SnackbarNotificationsService } from '../../notifications/services/snackbar-notifications.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandlerService {
  constructor(
    private notificationService: SnackbarNotificationsService) {
  }
  /**
   * Handles errors by displaying an error notification if the error is an instance of HttpErrorResponse.
   *
   * @param {Error | HttpErrorResponse} error - The error object to be handled.
   * @return {void} This function does not return a value.
   */
  public handleError(error: Error | HttpErrorResponse): void {
    if (error instanceof HttpErrorResponse) {
      this.notificationService.showError(error.error);
    } else {
      this.notificationService.showError(error.message);
    }
  }
}
