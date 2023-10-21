import { 
  ActivatedRouteSnapshot, 
  CanActivate, 
  Router, 
  RouterStateSnapshot, 
  UrlTree 
} from '@angular/router';

import { Injectable } from '@angular/core';
import { Observable, catchError, combineLatest, of, switchMap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { MenuService } from "src/app/shared/menu/menu.service";

@Injectable({
  providedIn: 'root'
})

export class RoleGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService,
    private menuService: MenuService
  ) {}


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {

    
      return combineLatest([
        of(this.authService.getIsAuthenticated()),
        this.menuService.userIdentify()
      ]).pipe(
        switchMap(([isAuthenticated, cargo]) => {
          if (isAuthenticated && cargo.cargo === 'Administrador') {
            return of(true);
          } else {
            this.router.navigateByUrl('/login');
            return of(false);
          }
        }),
        catchError((error) => {
          console.error(error);
          this.router.navigateByUrl('login');
          return of(false);
        })
      );
  }
}