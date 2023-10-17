import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProduzirComponent } from './produzir.component';

const routes: Routes = [
  { 
    path: '', 
    component: ProduzirComponent
   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProduzirRoutingModule { }
