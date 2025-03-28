import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-starter',
  imports: [],
  templateUrl: './starter.component.html',
  styleUrl: './starter.component.scss'
})
export class StarterComponent {
  constructor(private router: Router) {}

  onLoginClick() {
    this.router.navigate(['/login']);
  }
}
