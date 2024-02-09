import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { ViewprojectComponent } from './viewproject/viewproject.component';
import { EditprojectComponent } from './editproject/editproject.component';
import { ViewfirstComponent } from './viewfirst/viewfirst.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ReportComponent } from './report/report.component';
import { EditlayoutComponent } from './editlayout/editlayout..component';
import { ViewlayoutComponent } from './viewlayout/viewlayout.component';
import { ViewfirstlayoutComponent } from './viewfirstlayout/viewfirstlayout.component';

@NgModule({
  declarations: [
    AppComponent,

    ViewprojectComponent,
    ViewlayoutComponent,
    HomeComponent,
    EditprojectComponent,
    EditlayoutComponent,
    ViewfirstComponent,
    ViewfirstlayoutComponent,
    ReportComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  providers: [],
  schemas: [NO_ERRORS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
