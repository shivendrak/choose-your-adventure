import { AuthGuard } from '../services';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

describe('AuthGuard', () => {
    describe('canActivate', () => {
        let authGuard: AuthGuard;
        let authService;
        let router;

        it('should return true for a logged in user', () => {
            authService = { isLoggedIn: () => true };
            router = {};
            authGuard = new AuthGuard(authService, router);

            expect(authGuard.canActivate({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot)).toEqual(true);
        });

        it('should navigate to default route when user is not logged in', () => {
            authService = { isLoggedIn: () => false };
            router = { navigate () { } };
            authGuard = new AuthGuard(authService, router);
            spyOn(router, 'navigate');
            authGuard.canActivate({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot);
            expect(router.navigate).toHaveBeenCalledWith(['']);
        });
    });
});
