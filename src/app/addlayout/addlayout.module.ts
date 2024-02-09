import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AddlayoutRoutingModule } from './addlayout-routing.module';
import { AddlayoutComponent } from './addlayout.component';

@NgModule({
  declarations: [
    AddlayoutComponent

  ],
  imports: [CommonModule, HttpClientModule,FormsModule,ReactiveFormsModule,AddlayoutRoutingModule
  ]
})
export class AddlayoutModule  {


}

