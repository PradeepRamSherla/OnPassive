import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { first } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { RegisterUser } from '../registerUser';
import { RegisterComponent } from '../register/register.component';
import { NotificationService } from '../services/notification.service';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
@ViewChild('groupList')
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    userList: any;
    user: Object[];
    getlist: any = [];

    // private Students: BehaviorSubject<groupList>;

    constructor(
    
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthService,
        private alertService: NotificationService

    ) {
       
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });



    }


    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
         console.log(this.f.username.value, this.f.password.value);
        // this.user = this.getlist.filter(x => x.name === this.f.username.value);

        // if(this.user) {
        //     console.log('Username already exists');
        //     this.loading = false;
        // } else {
        //     console.log('notfound ');
        //     this.loading = false;
        // }

        this.authenticationService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.loading = false;
                    this.router.navigate(["/dashboard"]);
                    this.loading = false;
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}