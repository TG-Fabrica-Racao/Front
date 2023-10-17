import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastrarComponent } from './cadastrar.component';
import { CadastroIgredienteComponent } from './cadastro-igrediente/cadastro-igrediente.component';
import { CadastroRacaoComponent } from './cadastro-racao/cadastro-racao.component';
import { CanDeactivateGuard } from 'src/app/shared/guards/can-deactivate-guard.service';

const routes: Routes = [
  { 
    path: '', 
    component: CadastrarComponent,
    children: [
      {
        path: 'cadastro-ingrediente',
        component: CadastroIgredienteComponent,
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: 'cadastro-racao',
        component: CadastroRacaoComponent,
        canDeactivate: [CanDeactivateGuard]
      },
    ]
   },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CadastrarRoutingModule { }
