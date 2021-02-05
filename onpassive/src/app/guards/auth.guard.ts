import { Injectable, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthGuard  implements CanActivate {
    constructor(
      
        public _router: Router,   
        public authService: AuthService       

    ) {
       
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        const currentUser = this.authService.currentUserValue;
        if (currentUser) {            
            return true;
        }     
        this._router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }

}