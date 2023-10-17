import { Injectable } from '@angular/core';

import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Racao } from '../models/racao';
import { RacaoService } from '../services/racao.service';


@Injectable({
  providedIn: 'root'
})
export class RacaoResolverService implements Resolve<Racao> {

  constructor(private racaoService: RacaoService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<Racao> {
    const id = route.paramMap.get('id');
    return this.racaoService.getRacaoById(id as string);
  }
}
