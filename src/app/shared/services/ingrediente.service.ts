import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { BuyIngrediente, CreateIngrediente, HistoricoCompraIngrediente, Ingrediente, UpdateIngrediente } from '../models/ingrediente';

@Injectable({
  providedIn: 'root'
})
export class IngredienteService {

  private readonly API = environment.API;
  private ingredientesSubject = new BehaviorSubject<Ingrediente[]>([]);

  constructor(private http: HttpClient) { }

  createIngrediente(values: CreateIngrediente): Observable<CreateIngrediente> {
    return this.http.post<CreateIngrediente>(`${this.API}/ingredientes/create`, values);
  }

  getIngredientes(filter?: string, value?: string | number): Observable<Ingrediente[]> {
    let params = new HttpParams();

    if (filter && value) {
      params = params.set(filter as string, value);
    }

    this.http.get<Ingrediente[]>(`${this.API}/ingredientes/`, { params: params }).pipe(
      tap((retorno) => console.log('Fluxo TAP', retorno)),

    )
      .subscribe((ingredientes) => {
        this.ingredientesSubject.next(ingredientes);
      })

    return this.ingredientesSubject.asObservable();
  }

  getIngredienteById(id: string): Observable<Ingrediente> {
    return this.http.get<Ingrediente>(`${this.API}/ingredientes/?id=${id}`);
  }

  updateIngrediente(id: number | string, value: UpdateIngrediente): Observable<UpdateIngrediente> {
    return this.http.patch<UpdateIngrediente>(`${this.API}/ingredientes/update/${id}`, value);
  }

  buyIngrediente(values: BuyIngrediente): Observable<BuyIngrediente> {
    return this.http.post<BuyIngrediente>(`${this.API}/ingredientes/comprar`, values);
  }

  getHistoricoCompraIngredientes(values?: any): Observable<HistoricoCompraIngrediente[]> {
    console.log('values => ', values)
    let params = new HttpParams();
    for (const key in values) {
      params = params.append(key, values[key]);
    }
    return this.http.get<HistoricoCompraIngrediente[]>(`${this.API}/ingredientes/historico-compras`, { params: params });
  }
}
