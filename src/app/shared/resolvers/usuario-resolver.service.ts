import { Injectable } from '@angular/core';

import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})


export class UsuarioResolverService implements Resolve<User> {

  constructor(private usuarioService: UsuarioService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    const id = route.paramMap.get('id');
    return this.usuarioService.getUsuarioById(id as string);
  }

}