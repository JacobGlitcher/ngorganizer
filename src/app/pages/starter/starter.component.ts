import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../services/user.service';

@Component({
  standalone: true,
  selector: 'app-starter',
  imports: [],
  templateUrl: './starter.component.html',
  styleUrl: './starter.component.scss',
})
export class StarterComponent {
  constructor(private router: Router) {}

  userService = inject(UserService);

  onLoginClick() {
    this.router.navigate(['/login']);
  }
}
