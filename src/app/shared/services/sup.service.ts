import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SupService {

    private readonly API = environment.API;

    constructor(private http: HttpClient) { }

    getAllGrupos(): Observable<{ id: number, nome: string }[]> {
        return this.http.get<{ id: number, nome: string }[]>(`${this.API}/grupos/`);
    }

    getAllCategorias(): Observable<{ id: number, nome: string }[]> {
        return this.http.get<{ id: number, nome: string }[]>(`${this.API}/categorias/`);
    }

    getAllFases(): Observable<{ id: number, nome: string }[]> {
        return this.http.get<{ id: number, nome: string }[]>(`${this.API}/fases-granja/`);
    }

}
