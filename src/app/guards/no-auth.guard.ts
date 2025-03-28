import { inject } from '@angular/core'
import { Router } from '@angular/router'
import { UserService } from '../services/user.service'

export const noAuthGuard = () => {
  const userService = inject(UserService)
  const router = inject(Router)

  if (!userService.isLoggedIn()) {
    return true
  } else {
    router.navigate(['/'])
    return false
  }
};
