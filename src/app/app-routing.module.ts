import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';
import { RoleGuard } from './shared/guards/role.guard';

const routes: Routes = [
  { 
    path: '', 
    redirectTo: '/login', 
    pathMatch: 'full' 
  },
  { 
    path: 'login', 
    loadChildren: () => import('./pages/login/login.module')
      .then(m => m.LoginModule) 
  },
  { 
    path: 'cadastrar',
    canActivate: [AuthGuard], 
    loadChildren: () => import('./pages/cadastrar/cadastrar.module')
      .then(m => m.CadastrarModule) 
  },
  { 
    path: 'consultar',
    canActivate: [AuthGuard], 
    loadChildren: () => import('./pages/consultar/consultar.module')
      .then(m => m.ConsultarModule) 
  },
  { 
    path: 'produzir',
    canActivate: [AuthGuard], 
    loadChildren: () => import('./pages/produzir/produzir.module')
      .then(m => m.ProduzirModule) 
  },
  { 
    path: 'comprar',
    canActivate: [AuthGuard],  
    loadChildren: () => import('./pages/comprar/comprar.module')
      .then(m => m.ComprarModule)
  },
  { 
    path: 'acertar-estoque',
    canActivate: [AuthGuard], 
    loadChildren: () => import('./pages/acertar-estoque/acertar-estoque.module')
      .then(m => m.AcertarEstoqueModule) 
  },
  { 
    path: 'sistema',
    canActivate: [AuthGuard, RoleGuard],
    loadChildren: () => import('./pages/sistema/sistema.module')
      .then(m => m.SistemaModule) 
  },
  {
    path: '**',
    redirectTo: '/login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
