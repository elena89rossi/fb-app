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

export const EMAIL_VALIDATOR_PATTERN = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';

@Component({
  selector: 'fb-console-user-form',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule, MatToolbarModule, MatCardModule,  MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent {
  userForm!: FormGroup;

  protected genderOpts = [ GENDER.Famale, GENDER.Male ];

  constructor(
      private formBuilder: FormBuilder) { }

  ngOnInit() {
     this.initUserForm();
  }

  get f() { return this.userForm.controls; }

  protected onSubmit(): void {
    if (!this.userForm.invalid) {
      alert("sono un form valido")
      this.save();
    } else {
      alert("sono un form invalido")
      this.markAllAsTouched();
    }
  }
  protected clear(): void {
    this.userForm.reset();
    this.userForm.markAsPristine();
  }
  protected markAllAsTouched(): void {
    Object.keys(this.userForm.controls).forEach((field) => {
      const control = this.userForm.get(field);
      control?.markAsTouched({ onlySelf: true });
    });
  }

  private save(): void {
   //TODO API
   alert("IMPLEMENTARE IL SERVIZION");
  }

  private initUserForm(): void {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      gender: ['', Validators.required],
      status: [USER_STATUS.Active, [Validators.required]]
  });
  }
}
