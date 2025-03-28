import { Component, inject } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { Router } from '@angular/router';

import { UserService } from '../../services/user.service'

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    NzLayoutModule,
    NzMenuModule
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(private router: Router) {}

  userService = inject(UserService)

  onLoginClick() {
    this.router.navigate(['/login'])
  }

  onRegisterClick() {
    this.router.navigate(['/register'])
  }

  onHomeClick() {
    this.router.navigate(['/'])
  }

  onOrganizerClick() {
    this.router.navigate(['/organizer'])
  }

  onLogout() {
    this.userService.logout()
    this.router.navigate(['/'])
  }

  get isLoginOrRegisterPage(): boolean {
    return this.router.url === '/login' || this.router.url === '/register'
  }
}
