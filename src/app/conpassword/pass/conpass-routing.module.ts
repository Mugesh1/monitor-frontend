import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NewpasswordComponent } from './newpassword.component';

const routes: Routes = [

  {
    path: 'confirmpassword',
    component: NewpasswordComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewpasswordRoutingModule { }
