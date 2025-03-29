import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StarterComponent } from './pages/starter/starter.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { OrganizerComponent } from './pages/organizer/organizer.component';

import { authGuard } from './guards/auth.guard';
import { noAuthGuard } from './guards/no-auth.guard';

export const routes: Routes = [
  { path: '', component: StarterComponent },
  { path: 'login', component: LoginComponent, canActivate: [noAuthGuard] },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [noAuthGuard],
  },
  {
    path: 'organizer',
    component: OrganizerComponent,
    canActivate: [authGuard],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
