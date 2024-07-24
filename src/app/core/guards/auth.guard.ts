import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from "@angular/router";
import {inject} from "@angular/core";
import {AuthService} from "../sevices/http/auth/auth.service";

export const authGuard: CanActivateFn = (_: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router = inject(Router)

  if (!AuthService.isAuthenticated) {
    router.navigate(['/login'], {queryParams: {redirect: state.url}}).then();
    return false;
  }
  return true;
}
