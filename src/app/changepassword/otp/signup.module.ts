import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupRoutingModule } from '../otp/signup-routing.module';
import { SignupComponent } from './signup.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BasicAuthHtppInterceptorService } from '../../services/basic-auth-interceptor.service';


@NgModule({
  declarations: [ SignupComponent],
  imports: [CommonModule,SignupRoutingModule,HttpClientModule,FormsModule],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: BasicAuthHtppInterceptorService, multi: true }],
})
export class SignupModule { }
