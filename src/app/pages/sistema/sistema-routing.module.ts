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
import { RoleGuard } from 'src/app/shared/guards/role.guard';

const routes: Routes = [
  { 
    path: '', 
    component: SistemaComponent,
    children: [
      {
        path: 'usuarios',
        pathMatch: 'prefix',
        canActivate: [RoleGuard],
        component: UsuariosComponent
      },
      {
        path: 'criar-usuario',
        pathMatch: 'prefix',
        canDeactivate: [CanDeactivateGuard],
        canActivate: [RoleGuard],
        component: CriarUsuarioComponent,
      },
      {
        path: 'editar-usuario/:id',
        pathMatch: 'full',
        canDeactivate: [CanDeactivateGuard],
        canActivate: [RoleGuard],
        component: EditarUsuarioComponent,
        resolve: {
          usuario: UsuarioResolverService
        }
      },
      {
        path: 'historico-compra-ingredientes',
        pathMatch: 'prefix',
        canActivate: [RoleGuard],
        component: HistoricoIngredientesComponent
      },
      {
        path: 'historico-compra-racoes',
        pathMatch: 'prefix',
        canActivate: [RoleGuard],
        component: HistoricoRacoesComponent
      },
      {
        path: 'acertos-estoque',
        pathMatch: 'prefix',
        canActivate: [RoleGuard],
        component: AcertosEstoqueComponent
      },
      {
        path: 'producoes',
        pathMatch: 'prefix',
        canActivate: [RoleGuard],
        component: ProducoesComponent
      },
      {
        path: 'logs',
        pathMatch: 'prefix',
        canActivate: [RoleGuard],
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
