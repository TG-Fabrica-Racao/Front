import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComprarComponent } from './comprar.component';
import { ListaIngredientesComponent } from './lista-ingredientes/lista-ingredientes.component';
import { ListaRacoesComponent } from './lista-racoes/lista-racoes.component';
import { CompraIngredienteComponent } from './compra-ingrediente/compra-ingrediente.component';
import { CompraRacaoComponent } from './compra-racao/compra-racao.component';
import { CanDeactivateGuard } from 'src/app/shared/guards/can-deactivate-guard.service';
import { IngredienteResolverService } from 'src/app/shared/resolvers/ingrediente-resolver.service';
import { RacaoResolverService } from 'src/app/shared/resolvers/racao-resolver.service';

const routes: Routes = [
  { 
    path: '', 
    component: ComprarComponent,
    children: [
      {
        path: 'ingredientes',
        component: ListaIngredientesComponent,
        pathMatch: 'prefix'
      },
      {
        path: 'racoes',
        component: ListaRacoesComponent,
        pathMatch: 'prefix'
      },
      {
        path: 'ingrediente/:id',
        component: CompraIngredienteComponent,
        pathMatch: 'full',
        canDeactivate: [CanDeactivateGuard],
        resolve: {
          ingrediente: IngredienteResolverService
        }
      },
      {
        path: 'racao/:id',
        component: CompraRacaoComponent,
        pathMatch: 'full',
        canDeactivate: [CanDeactivateGuard],
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
export class ComprarRoutingModule { }
