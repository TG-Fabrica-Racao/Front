import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProduzirRoutingModule } from './produzir-routing.module';
import { ProduzirComponent } from './produzir.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuModule } from 'src/app/shared/menu/menu.module';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';


@NgModule({
  declarations: [
    ProduzirComponent
  ],
  imports: [
    CommonModule,
    ProduzirRoutingModule,
    MenuModule,
    FormsModule,
    ReactiveFormsModule,
    DialogModule,
    ToastModule
  ]
})
export class ProduzirModule { }
