import { Route, RouterModule } from "@angular/router";
import { USER_ROUTES } from "./features/user-session/static-entities/routes/user-routes.enum";
import { UserSessionContainerComponent } from "./features/user-session/components/user-session-container/user-session-container.component";
import { UserSessionGuard } from "./features/user-session/guards/user-session.guards";
import { UserFormComponent } from "./features/user-session/components/user-form/user-form.component";

export const appRoutes: Route[] = [
    // {
    //     path: USER_ROUTES.UserDetail + '/:id',
    //     canActivate: [UserSessionGuard],
    //     component: UserSessionContainerComponent
    // },
    {
        path: '',
        canActivate: [UserSessionGuard],
        component: UserSessionContainerComponent
    },
    {
        path: USER_ROUTES.RegisterNewUser,
        component: UserFormComponent
    },
    { path: '**', redirectTo:  USER_ROUTES.RegisterNewUser }
];

export const APP_ROUTES = RouterModule.forRoot(appRoutes);