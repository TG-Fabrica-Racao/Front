import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SistemaComponent } from './sistema.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { CriarUsuarioComponent } from './criar-usuario/criar-usuario.component';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';
import { HistoricoIngredientesComponent } from './historico-ingredientes/historico-ingredientes.component';
import { HistoricoRacoesComponent } from './historico-racoes/historico-racoes.component';
import { AcertosEstoqueComponent } from './acertos-estoque/acertos-estoque.component';
import { ProducoesComponent } from './producoes/producoes.component';
import { LogsComponent } from './logs/logs.component';
import { CanDeactivateGuard } from 'src/app/shared/guards/can-deactivate-guard.service';
import { UsuarioResolverService } from 'src/app/shared/resolvers/usuario-resolver.service';

const routes: Routes = [
  { 
    path: '', 
    component: SistemaComponent,
    children: [
      {
        path: 'usuarios',
        pathMatch: 'prefix',
        component: UsuariosComponent
      },
      {
        path: 'criar-usuario',
        pathMatch: 'prefix',
        component: CriarUsuarioComponent,
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: 'editar-usuario/:id',
        pathMatch: 'full',
        component: EditarUsuarioComponent,
        canDeactivate: [CanDeactivateGuard],
        resolve: {
          usuario: UsuarioResolverService
        }
      },
      {
        path: 'historico-compra-ingredientes',
        pathMatch: 'prefix',
        component: HistoricoIngredientesComponent
      },
      {
        path: 'historico-compra-racoes',
        pathMatch: 'prefix',
        component: HistoricoRacoesComponent
      },
      {
        path: 'acertos-estoque',
        pathMatch: 'prefix',
        component: AcertosEstoqueComponent
      },
      {
        path: 'producoes',
        pathMatch: 'prefix',
        component: ProducoesComponent
      },
      {
        path: 'logs',
        pathMatch: 'prefix',
        component: LogsComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SistemaRoutingModule { }
