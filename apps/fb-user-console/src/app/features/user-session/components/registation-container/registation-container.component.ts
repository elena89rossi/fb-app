import { Component } from '@angular/core';
import { UserFormComponent } from '../user-form/user-form.component';

@Component({
  standalone: true,
  imports: [UserFormComponent],
  selector: 'fb-console-registation-container',
  templateUrl: './registation-container.component.html',
  styleUrls: ['./registation-container.component.scss'],
})
export class RegistationContainerComponent {}
