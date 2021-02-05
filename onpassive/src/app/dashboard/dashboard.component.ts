import { Component, OnInit } from '@angular/core';
import {  AuthService } from '../services/auth.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RegisterUser } from '../registerUser';
let users = JSON.parse(localStorage.getItem('users')) || [];
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  private currentUserSubject: BehaviorSubject<RegisterUser>;
  public currentUser: Observable<RegisterUser>;
  
  data:any;
  id:number;
  username:string;
  city:string;
  country:string;
  state:string;
  courses:string;
  constructor(private authenticationService: AuthService) {
    this.currentUserSubject = new BehaviorSubject<RegisterUser>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
   }

  ngOnInit() {
    this.data = users;   
    console.log(this.currentUserSubject.value, this.data) ;
    this.id = this.currentUserSubject.value['id'];
    this.username = this.currentUserSubject.value['username'];
    this.state = this.currentUserSubject.value['state'];
    this.city = this.currentUserSubject.value['city'];
    this.country = this.currentUserSubject.value['country'];
    this.courses = this.currentUserSubject.value['courses'];

  }
 logout(){
   this.authenticationService.logout();
 }
}
