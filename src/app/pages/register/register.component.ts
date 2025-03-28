import { Component, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';

@Component({
  standalone: true,
  selector: 'app-register',
  imports: [ReactiveFormsModule, NzButtonModule, NzCheckboxModule, NzFormModule, NzInputModule, NzSelectModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  private fb = inject(NonNullableFormBuilder);
  private router = inject(Router);
  private userService = inject(UserService);

  validateForm = this.fb.group({
    username: this.fb.control('', [Validators.required]),
    password: this.fb.control('', [Validators.required]),
    checkPassword: this.fb.control('', [Validators.required, this.confirmationValidator]),
  });

  ngOnInit() {
    this.validateForm.controls.checkPassword.setValidators([
      Validators.required,
      this.confirmationValidator.bind(this)
    ]);
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      const { username, password } = this.validateForm.value
      if (this.userService.register(username!, password!)) {
        console.log('Registration successful')
        this.router.navigate(['/login'])
      } else {
        console.log('Username already exists')
      }
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty()
          control.updateValueAndValidity({ onlySelf: true })
        }
      });
    }
  }

  confirmationValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return { required: true }
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true }
    }
    return {}
  }

  onLoginClick() {
    this.router.navigate(['/login'])
  }
}
