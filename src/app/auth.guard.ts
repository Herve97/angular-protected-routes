import { inject } from '@angular/core';
import {
  CanActivateFn,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Route,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';

// hardcoded user data.
const loggedInUser = {
  id: '1zx-casd123-asdzxc132',
  name: 'Lakindu Hewawasam',
  role: 'admin',
};

export const authGuard: CanActivateFn = (
  route,
  state
):
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree => {

  const router = inject(Router);

  const { role } = loggedInUser;

  // provides the route configuration options.
  const { routeConfig } = route;

  // provides the path of the route.
  const { path } = routeConfig as Route;

  if (path?.includes('admin') && role === 'admin') {
    // if user is administrator and is trying to access admin routes, allow access.

    return true;
  }

  if (path?.includes('customer') && role === 'customer') {
    // if user is customer and is accessing customer route, allow access.

    return true;
  }

  if (path?.includes('admin') && role === 'admin') {
    // if user is administrator and is trying to access admin routes, allow access.

    return true;
  }

  if (path?.includes('customer') && role === 'customer') {
    // if user is customer and is accessing customer route, allow access.

    return true;
  }

  if (
    (path?.includes('guest') || path?.includes('home')) &&
    (role === 'customer' || role === 'administrator')
  ) {
    // if a logged in user goes to Guest or Home, navigate to their respective dashboard.

    router.navigateByUrl(role === 'customer' ? '/customer' : '/admin');
    return false;
  }

  // for any other condition, navigate to the forbidden route.

  router.navigateByUrl('/forbidden');
  return false;

};
