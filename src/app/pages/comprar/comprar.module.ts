import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComprarRoutingModule } from './comprar-routing.module';
import { ComprarComponent } from './comprar.component';
import { ListaIngredientesComponent } from './lista-ingredientes/lista-ingredientes.component';
import { ListaRacoesComponent } from './lista-racoes/lista-racoes.component';
import { CompraRacaoComponent } from './compra-racao/compra-racao.component';
import { MenuModule } from 'src/app/shared/menu/menu.module';
import { ToastModule } from 'primeng/toast';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CompraIngredienteComponent } from './compra-ingrediente/compra-ingrediente.component';


@NgModule({
  declarations: [
    ComprarComponent,
    ListaIngredientesComponent,
    ListaRacoesComponent,
    CompraRacaoComponent,
    CompraIngredienteComponent,
  ],
  imports: [
    CommonModule,
    ComprarRoutingModule,
    MenuModule,
    ToastModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ComprarModule { }
