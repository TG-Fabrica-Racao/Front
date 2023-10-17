import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
  { path: 'cadastrar', loadChildren: () => import('./pages/cadastrar/cadastrar.module').then(m => m.CadastrarModule) },
  { path: 'consultar', loadChildren: () => import('./pages/consultar/consultar.module').then(m => m.ConsultarModule) },
  { path: 'produzir', loadChildren: () => import('./pages/produzir/produzir.module').then(m => m.ProduzirModule) },
  { path: 'comprar', loadChildren: () => import('./pages/comprar/comprar.module').then(m => m.ComprarModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
