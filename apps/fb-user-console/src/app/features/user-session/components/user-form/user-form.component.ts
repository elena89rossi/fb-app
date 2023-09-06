import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { USER_STATUS } from '../../static-entities/user-status/user-status.enum';
import { GENDER } from '../../static-entities/gender/gender.enum';
import { IUser } from '../../models/user.interface';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { UserSessionService } from '../../services/user-session.service';

export const EMAIL_VALIDATOR_PATTERN = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';

@Component({
  selector: 'fb-console-user-form',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule, MatToolbarModule, MatCardModule,  MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent {
  protected userForm!: FormGroup;
  protected genderOpts = [ GENDER.Famale, GENDER.Male ];
  private destroyed$: Subject<void> = new Subject();

  constructor(private formBuilder: FormBuilder, private userSessionService: UserSessionService, private router: Router) { }
/**
 * Initializes the component when it is first created.
 *
 * @param {none} - This function has no parameters.
 * @return {none} - This function does not return a value.
 */
  ngOnInit() {
     this.initUserForm();
  }

  get f() { return this.userForm.controls; }

  /**
   * Destroys the component and cleans up any resources.
   *
   * @return {void}
   */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
  /**
   * Submits the user form.
   *
   * @param {FormGroup} user - The user form group.
   * @return {void} This function does not return a value.
   */
  protected onSubmit(): void {
    if (!this.userForm.invalid) {
      this.saveUser(this.userForm.value);
    } else {
      this.markAllAsTouched();
    }
  }
  /**
   * Clears the user form and marks it as pristine.
   */
  protected clear(): void {
    this.userForm.reset();
    this.userForm.markAsPristine();
  }

  /**
   * Marks all form controls as touched.
   *
   * @protected
   * @return {void} 
   */
  protected markAllAsTouched(): void {
    Object.keys(this.userForm.controls).forEach((field) => {
      const control = this.userForm.get(field);
      control?.markAsTouched({ onlySelf: true });
    });
  }
  /**
   * Saves a user and navigate to main route
   *
   * @param {IUser} user - The user to be saved.
   * @return {void} No return value.
   */
  private saveUser(user: IUser): void {
   this.userSessionService.saveUser(user).pipe(
    takeUntil(this.destroyed$)
   ).subscribe((user: IUser) => {
    if(user?.id) {
      this.router.navigate(['/']);
    }
   })
  }
  /**
   * Initializes the user form.
   *
   * @private
   * @returns {void}
   */
  private initUserForm(): void {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      gender: ['', Validators.required],
      status: [USER_STATUS.Active, [Validators.required]]
  });
  }
}
