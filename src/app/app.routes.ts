import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { StarterComponent } from './pages/starter/starter.component'
import { LoginComponent } from './pages/login/login.component'
import { RegisterComponent } from './pages/register/register.component'
import { OrganizerComponent } from './pages/organizer/organizer.component'

export const routes: Routes = [
  { path: '', component: StarterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'organizer', component: OrganizerComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
