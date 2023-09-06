import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { USER_ROUTES } from '../static-entities/routes/user-routes.enum';

@Injectable()
export class UserSessionGuard {

    constructor(private router: Router) { }
    /**
     * If  CURRENT_USER exist the function enable route navigation.
     * If  CURRENT_USER not exist the function redirect to register page
     *  
     * @param {ActivatedRouteSnapshot} route - The route that is being activated.
     * @param {RouterStateSnapshot} state - The current state of the router.
     * @return {boolean} Returns true if the user can activate the route, false otherwise.
     */
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