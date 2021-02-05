import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { RegisterUser } from '../registerUser';
import { environment } from '../../environments/environment';
//import { BackendService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient, //private backend:BackendService
        ) { }
register(user: RegisterUser) {
    console.log(user);
    return this.http.post(`${environment.apiUrl}/users/register`, user);
}
}