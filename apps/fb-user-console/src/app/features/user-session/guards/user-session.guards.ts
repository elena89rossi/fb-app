import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { USER_ROUTES } from '../static-entities/routes/user-routes.enum';

@Injectable()
export class UserSessionGuard {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        debugger;
        const CURRENT_USER =  localStorage.getItem('currentUser');
        if (CURRENT_USER) {
            return true;
        }

        this.router.navigate([USER_ROUTES.RegisterNewUser], { queryParams: { returnUrl: state.url }});
        return false;
    }
}