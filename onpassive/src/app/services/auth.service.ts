
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { RegisterUser } from '../registerUser';

import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {


    private currentUserSubject: BehaviorSubject<RegisterUser>;
    public currentUser: Observable<RegisterUser>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<RegisterUser>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): RegisterUser {
        return this.currentUserSubject.value;
    }

    login(username, password) {
        console.log( username, password);
        return this.http.post<any>(`${environment.apiUrl}/users/authenticate`, { username, password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            }));
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}