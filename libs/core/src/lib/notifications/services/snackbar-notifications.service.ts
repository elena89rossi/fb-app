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

  public showError(message: string, closeKey: string | null = null ,route: string | undefined = undefined): void {
    debugger;
    this.showSnackBar(
      {
        panelClass: ['alert-snackbar'],
        data: {
          message: message,
          closeKey: closeKey,
        } 
      }, route);
  }

  public showSnackBar(config: MatSnackBarConfig, route: string | undefined = undefined): void {
    if (!config?.data.closeKey) {
      config.data.closeKey = 'Close';
    }

    this.zone.run(() => {
      this.zoneRun(config, route as string);
    });
  }

  private zoneRun(config: MatSnackBarConfig, route: string): void {
    const snackBarRef = this.snackBar.openFromComponent(CustomSnackBarComponent, config);
    if (route) {
      snackBarRef.onAction().subscribe(() => {
        this.router.navigate([route]).then();
      });
    }
  }
}
