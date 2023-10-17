import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CadastrarRoutingModule } from './cadastrar-routing.module';
import { CadastrarComponent } from './cadastrar.component';
import { MenuModule } from 'src/app/shared/menu/menu.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CadastroIgredienteComponent } from './cadastro-igrediente/cadastro-igrediente.component';
import { CadastroRacaoComponent } from './cadastro-racao/cadastro-racao.component';
import { ToastModule } from 'primeng/toast';


@NgModule({
  declarations: [
    CadastrarComponent,
    CadastroIgredienteComponent,
    CadastroRacaoComponent
  ],
  imports: [
    CommonModule,
    CadastrarRoutingModule,
    MenuModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule
  ]
})
export class CadastrarModule { }
