import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { CreateRacao, ProduzirRacao, Racao } from '../models/racao';

@Injectable({
  providedIn: 'root'
})
export class RacaoService {
  private readonly API = environment.API;
  private racoesSubject = new BehaviorSubject<Racao[]>([]);

  constructor(private http: HttpClient) { }

  createRacao(values: CreateRacao): Observable<CreateRacao> {
    return this.http.post<CreateRacao>(`${this.API}/racoes/create`, values);
  }

  getRacoes(filter?: string, value?: string | number): Observable<Racao[]> {
    let params = new HttpParams();

    if (filter && value) {
      params = params.set(filter as string, value);
    }

    this.http.get<Racao[]>(`${this.API}/racoes/`, { params: params }).pipe(
      tap((retorno) => console.log('Fluxo TAP', retorno)),

    )
      .subscribe((racoes) => {
        this.racoesSubject.next(racoes);
      })

    return this.racoesSubject.asObservable();
  }

  getRacaoById(id: string): Observable<Racao> {
    return this.http.get<Racao>(`${this.API}/racoes/?id=${id}`);
  }

  produzirRacao(id: number, quantidade: number): Observable<ProduzirRacao> {
    const values = {
      id_racao: +id,
      quantidade: parseFloat(quantidade.toString()).toFixed(2)
    }
    console.info('Values =>', values)
    return this.http.post<ProduzirRacao>(`${this.API}/racoes/produzir`, values);
  }
}
