import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultarComponent } from './consultar.component';
import { CanDeactivateGuard } from 'src/app/shared/guards/can-deactivate-guard.service';
import { ConsultarIngredientesComponent } from './consultar-ingredientes/consultar-ingredientes.component';
import { ConsultarRacoesComponent } from './consultar-racoes/consultar-racoes.component';
import { EditarIngredienteComponent } from './editar-ingrediente/editar-ingrediente.component';
import { EditarRacaoComponent } from './editar-racao/editar-racao.component';
import { IngredienteResolverService } from 'src/app/shared/resolvers/ingrediente-resolver.service';
import { RacaoResolverService } from 'src/app/shared/resolvers/racao-resolver.service';
import { IngredientesRacaoComponent } from './ingredientes-racao/ingredientes-racao.component';


const routes: Routes = [
  { 
    path: '', 
    component: ConsultarComponent,
    children: [
      {
        path: 'ingredientes',
        component: ConsultarIngredientesComponent,
        pathMatch: 'prefix'
      },
      {
        path: 'racoes',
        component: ConsultarRacoesComponent,
        pathMatch: 'prefix'
      },
      {
        path: 'ingrediente/:id/editar',
        component: EditarIngredienteComponent,
        pathMatch: 'full',
        canDeactivate: [CanDeactivateGuard],
        resolve: {
          ingrediente: IngredienteResolverService
        }
      },
      {
        path: 'racao/:id/editar',
        component: EditarRacaoComponent,
        pathMatch: 'full',
        canDeactivate: [CanDeactivateGuard],
        resolve: {
          racao: RacaoResolverService
        }
      },
      {
        path: 'racao/:id/ingredientes',
        component: IngredientesRacaoComponent,
        pathMatch: 'full',
        resolve: {
          racao: RacaoResolverService
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultarRoutingModule { }
