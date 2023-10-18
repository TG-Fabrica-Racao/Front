import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SistemaRoutingModule } from './sistema-routing.module';
import { SistemaComponent } from './sistema.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';
import { CriarUsuarioComponent } from './criar-usuario/criar-usuario.component';
import { HistoricoIngredientesComponent } from './historico-ingredientes/historico-ingredientes.component';
import { HistoricoRacoesComponent } from './historico-racoes/historico-racoes.component';
import { LogsComponent } from './logs/logs.component';
import { AcertosEstoqueComponent } from './acertos-estoque/acertos-estoque.component';
import { ProducoesComponent } from './producoes/producoes.component';
import { MenuModule } from 'src/app/shared/menu/menu.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';


@NgModule({
  declarations: [
    SistemaComponent,
    UsuariosComponent,
    EditarUsuarioComponent,
    CriarUsuarioComponent,
    HistoricoIngredientesComponent,
    HistoricoRacoesComponent,
    LogsComponent,
    AcertosEstoqueComponent,
    ProducoesComponent,
  ],
  imports: [
    CommonModule,
    SistemaRoutingModule,
    MenuModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule
  ]
})
export class SistemaModule { }
