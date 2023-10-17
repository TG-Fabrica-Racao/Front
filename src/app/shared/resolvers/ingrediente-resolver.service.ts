import { Injectable } from '@angular/core';

import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Ingrediente } from '../models/ingrediente';
import { IngredienteService } from '../services/ingrediente.service';

@Injectable({
  providedIn: 'root'
})
export class IngredienteResolverService implements Resolve<Ingrediente> {

  constructor(private ingredienteService: IngredienteService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<Ingrediente> {
    const id = route.paramMap.get('id');
    return this.ingredienteService.getIngredienteById(id as string);
  }
}
