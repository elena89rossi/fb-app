import { Injectable, NgZone } from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CustomSnackBarComponent } from '../components/custom-snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class SnackbarNotificationsService {
  
  constructor(private snackBar: MatSnackBar, private zone: NgZone, private router: Router) {
  }
/**
 * Shows a success message in a snackbar.
 *
 * @param {string} message - The success message to display.
 * @param {string | null} closeKey - The key to close the snackbar, or null if no close key is provided.
 * @param {string | undefined} route - The route to navigate to after the snackbar is closed, or undefined if no route is provided.
 * @return {void} This function does not return a value.
 */
  public showSuccess(message: string, closeKey: string | null = null , route: string | undefined = undefined): void {
    this.showSnackBar(
      {
        duration: 5000,
        panelClass: ['success-snackbar'],
        data: {
          message: message,
          closeKey: closeKey,
        }
      }, route);
  }
  /**
   * Displays a warning message in a snackbar.
   *
   * @param {string} message - The warning message to display.
   * @param {string | null} closeKey - The key to close the snackbar, if any.
   * @param {string | undefined} route - The route to navigate to after closing the snackbar, if any.
   * @return {void}
   */
  public showWarning(message: string,  closeKey: string | null = null ,route: string | undefined = undefined): void {
    this.showSnackBar(
      {
        panelClass: ['warning-snackbar'],
        data: {
          message: message,
          closeKey: closeKey
        }
      }, route);
  }
  /**
   * Shows an error message and optionally closes a key and navigates to a specified route.
   *
   * @param {string} message - The error message to display.
   * @param {string | null} closeKey - (Optional) The key to close.
   * @param {string | undefined} route - (Optional) The route to navigate to.
   * @return {void} 
   */
  public showError(message: string, closeKey: string | null = null ,route: string | undefined = undefined): void {
    this.showSnackBar(
      {
        panelClass: ['alert-snackbar'],
        data: {
          message: message,
          closeKey: closeKey,
        } 
      }, route);
  }
/**
 * Displays a snackbar with the given configuration.
 *
 * @param {MatSnackBarConfig} config - The configuration for the snackbar.
 * @param {string | undefined} route - The route to navigate to after the snackbar is closed.
 * @return {void} This function does not return a value.
 */
  public showSnackBar(config: MatSnackBarConfig, route: string | undefined = undefined): void {
    if (!config?.data.closeKey) {
      config.data.closeKey = 'Close';
    }

    this.zone.run(() => {
      this.zoneRun(config, route as string);
    });
  }
  /**
   * Runs a function within a zone.
   *
   * @param {MatSnackBarConfig} config - The configuration for the snackbar.
   * @param {string} route - The route to navigate to on snackbar action.
   */
  private zoneRun(config: MatSnackBarConfig, route: string): void {
    const snackBarRef = this.snackBar.openFromComponent(CustomSnackBarComponent, config);
    if (route) {
      snackBarRef.onAction().subscribe(() => {
        this.router.navigate([route]).then();
      });
    }
  }
}
