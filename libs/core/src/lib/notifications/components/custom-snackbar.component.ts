import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { ISnackBarData } from '../models/snackbar-data.interface';


@Component({
  selector: 'shared-ui-libraries-app-custom-snackbar',
  templateUrl: './custom-snackbar.component.html',
  styleUrls: ['./custom-snackbar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CustomSnackBarComponent implements OnInit {
  public close = '';
  public message: string = '';
  public link = '';

  constructor(@Inject(MAT_SNACK_BAR_DATA) private data: ISnackBarData, private snackRef: MatSnackBarRef<CustomSnackBarComponent>) {
  }

  /**
   * Initializes the component.
   *
   * This function is called when the component is first created.
   * It sets the value of the `message` property to the value of `data.message`,
   * and if `data.closeKey` is truthy, it sets the value of the `close` property
   * to the value of `data.closeKey`.
   *
   * @param {void} None
   * @return {void} None
   */
  public ngOnInit(): void {
    this.message = this.data.message;
    if (this.data.closeKey) {
      this.close = this.data.closeKey;
    }
  }

  /**
   * Closes the snack bar.
   *
   * @param {} - No parameters
   * @return {void} - No return value
   */
  public closeSnackBar(): void {
    this.snackRef.dismiss();
  }
}
