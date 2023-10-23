import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsultarRoutingModule } from './consultar-routing.module';
import { ConsultarComponent } from './consultar.component';
import { ConsultarIngredientesComponent } from './consultar-ingredientes/consultar-ingredientes.component';
import { ConsultarRacoesComponent } from './consultar-racoes/consultar-racoes.component';
import { EditarIngredienteComponent } from './editar-ingrediente/editar-ingrediente.component';
import { EditarRacaoComponent } from './editar-racao/editar-racao.component';
import { MenuModule } from 'src/app/shared/menu/menu.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ConfirmDialogModule } from 'primeng/confirmdialog';


@NgModule({
  declarations: [
    ConsultarComponent,
    ConsultarIngredientesComponent,
    ConsultarRacoesComponent,
    EditarIngredienteComponent,
    EditarRacaoComponent,
  ],
  imports: [
    CommonModule,
    ConsultarRoutingModule,
    MenuModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    OverlayPanelModule,
    ConfirmDialogModule
  ]
})
export class ConsultarModule { }
