import { Component, OnInit, Input, } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import {  AuthService } from '../services/auth.service';
import {  UserService } from '../services/user.service';
import {  NotificationService } from '../services/notification.service';
import { Injectable } from '@angular/core';

//import { BackendService } from '../services/backend.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

@Injectable()
export class RegisterComponent implements OnInit {
  
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  groupList:any = [];
 // @Input() groupList:any = [];


  constructor(
         private formBuilder: FormBuilder,
      private router: Router,
      private authenticationService: AuthService,
      private userService: UserService,
      //private backendService: BackendService,
      private notificationService: NotificationService
  ) {
    
  }

  ngOnInit() {
      this.registerForm = this.formBuilder.group({
        userid: ['', Validators.required],
        username: ['', Validators.required],        
        password: ['', [Validators.required, Validators.minLength(6)]],
        courses: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        country: ['', Validators.required]
      });


     

  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }
navigation(){
  this.router.navigate(['/login']);
}
  onSubmit() {
      this.submitted = true;

      // reset alerts on submit
      this.notificationService.clear();

      if (this.registerForm.invalid) {
        return;
    }
      this.loading = true;
       console.log(this.registerForm.value);
      // this.groupList.push(this.registerForm.value);

      // console.log(this.groupList);
      // this.notificationService.success('Registration successful', true);
      // this.router.navigate(['/login']);
     

     
      this.userService.register(this.registerForm.value)
          .pipe(first())
          .subscribe(
              data => {
                  this.notificationService.success('Registration successful', true);
                  this.router.navigate(['/login']);
              },
              error => {
                  this.notificationService.error(error);
                  this.loading = false;
              });
  }
}