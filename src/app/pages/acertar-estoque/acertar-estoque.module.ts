import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AcertarEstoqueRoutingModule } from './acertar-estoque-routing.module';
import { AcertarEstoqueComponent } from './acertar-estoque.component';
import { DialogModule } from 'primeng/dialog';
import { MenuModule } from 'src/app/shared/menu/menu.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [
    AcertarEstoqueComponent
  ],
  imports: [
    CommonModule,
    AcertarEstoqueRoutingModule,
    DialogModule,
    MenuModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule
  ]
})
export class AcertarEstoqueModule { }
