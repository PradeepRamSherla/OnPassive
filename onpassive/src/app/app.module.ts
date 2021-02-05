import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotificationComponent } from './notification/notification.component';
import { RouterModule } from '@angular/router';
//import { BackendService } from './services/backend.service';
import { fakeBackendProvider } from './services/backend.service';
import { AuthService } from './services/auth.service';
import { FormBuilder } from '@angular/forms';
import { AuthGuard } from './guards/auth.guard';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { Jwt } from './services/jwt.service';
import { ErrorInterceptor } from './services/error.service';




import { HomeComponent } from './home/home.component';
import { AlertComponent } from './components/alert.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    NotificationComponent,
    HomeComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
    
  ],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: Jwt, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },AuthService, fakeBackendProvider, FormBuilder, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }



