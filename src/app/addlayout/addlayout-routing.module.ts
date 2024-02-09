import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddlayoutComponent } from './addlayout.component';



const routes: Routes = [

  {
    path: 'add-items-layout',
    component: AddlayoutComponent
  },


];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddlayoutRoutingModule {}
