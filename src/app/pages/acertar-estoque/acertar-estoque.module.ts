import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AcertarEstoqueRoutingModule } from './acertar-estoque-routing.module';
import { AcertarEstoqueComponent } from './acertar-estoque.component';


@NgModule({
  declarations: [
    AcertarEstoqueComponent
  ],
  imports: [
    CommonModule,
    AcertarEstoqueRoutingModule
  ]
})
export class AcertarEstoqueModule { }
