import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ViewprojectComponent } from './viewproject/viewproject.component';

import { EditprojectComponent } from './editproject/editproject.component';
import { ViewfirstComponent } from './viewfirst/viewfirst.component';
import { AuthGaurdService } from './services/auth-gaurd.service';
import { ReportComponent } from './report/report.component';
import { EditlayoutComponent } from './editlayout/editlayout..component';
import { ViewlayoutComponent } from './viewlayout/viewlayout.component';
import { ViewfirstlayoutComponent } from './viewfirstlayout/viewfirstlayout.component';

const routes: Routes = [

  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'addproject',
    loadChildren: () => import('./addproject/addproject.module').then(m => m.AddprojectModule),
    canActivate: [AuthGaurdService]
  },
  {
    path: 'addlayout',
    loadChildren: () => import('./addlayout/addlayout.module').then(m=>m.AddlayoutModule),
    canActivate: [AuthGaurdService]
  },
    {
    path: 'changepassword',

    loadChildren: () => import('./changepassword/otp/signup.module').then(m => m.SignupModule)
  },

  {
    path: 'newpassword',

    loadChildren: () => import('./conpassword/pass/conpass.module').then(m => m.ConpassModule)
  },
{
  path: 'home',
  component: HomeComponent,
  canActivate: [AuthGaurdService]
},

{
  path: 'viewproject/:project',
  component: ViewprojectComponent,
  canActivate: [AuthGaurdService]

},

{
  path: 'viewlayout/:project',
  component: ViewlayoutComponent,
  canActivate: [AuthGaurdService]

},

{
  path: 'viewfirst/:project',
  component: ViewfirstComponent
},
{
  path: 'viewfirstlayout/:project',
  component: ViewfirstlayoutComponent
},
{
  path: 'editproject/:mid',
  component: EditprojectComponent
},
{
  path: 'editlayout/:id',
  component: EditlayoutComponent
},
{
  path: 'report',
  component: ReportComponent
},

]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
