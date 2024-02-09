import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewpasswordComponent } from './newpassword.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BasicAuthHtppInterceptorService } from '../../services/basic-auth-interceptor.service';
import { NewpasswordRoutingModule } from './conpass-routing.module';


@NgModule({
  declarations: [ NewpasswordComponent],
  imports: [
    CommonModule,
    NewpasswordRoutingModule ,

    HttpClientModule,
    FormsModule
  ],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: BasicAuthHtppInterceptorService, multi: true }],
})
export class ConpassModule { }
