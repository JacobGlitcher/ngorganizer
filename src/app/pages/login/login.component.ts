import { Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ErrorAlertComponent } from '../../components/error-alert/error-alert.component';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    NzButtonModule,
    NzCheckboxModule,
    NzFormModule,
    NzInputModule,
    ErrorAlertComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private fb = inject(NonNullableFormBuilder);
  private router = inject(Router);
  private userService = inject(UserService);

  validateForm = this.fb.group({
    username: this.fb.control('', [Validators.required]),
    password: this.fb.control('', [Validators.required]),
  });

  errorMessage = signal<string | null>(null);

  submitForm(): void {
    if (this.validateForm.valid) {
      const { username, password } = this.validateForm.value;
      if (this.userService.login(username!, password!)) {
        this.errorMessage.set(null);
        this.router.navigate(['/organizer']);
      } else {
        this.errorMessage.set('Invalid credentials');
      }
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  onRegisterClick() {
    this.router.navigate(['/register']);
  }
}
