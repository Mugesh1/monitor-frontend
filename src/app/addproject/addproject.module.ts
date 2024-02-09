import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddprojectComponent } from './addproject.component';
import { AddprojectRoutingModule } from './addproject-routing.module';

@NgModule({
  declarations: [
    AddprojectComponent

  ],
  imports: [CommonModule, HttpClientModule,FormsModule,ReactiveFormsModule,AddprojectRoutingModule
  ]
})
export class AddprojectModule  {


}

