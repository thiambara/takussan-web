import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from "@angular/router";
import {inject} from "@angular/core";
import {AuthService} from "../sevices/http/auth/auth.service";

export const dashboardGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router = inject(Router)

  if (AuthService.isAuthenticated && next.routeConfig?.path === 'login') {
    router.navigate(['/']).then();
    return false;
  }
  if (AuthService.isAuthenticated || next.routeConfig?.path === 'login') {
    return true;
  }

  router.navigate(['/login'], {queryParams: {redirect: state.url}}).then();
  return false;
}
