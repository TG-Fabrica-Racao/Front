import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { CreateUser, UpdateUser, User, UserLogs } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private readonly API = environment.API;
  private usuariosSubject = new BehaviorSubject<User[]>([]);

  constructor(private http: HttpClient) { }

  getUsuarios(filter?: string, value?: string | number): Observable<User[]> {
    let params = new HttpParams();

    if (filter && value) {
      params = params.set(filter as string, value);
    }

    this.http.get<User[]>(`${this.API}/users/`, { params: params }).pipe(
      tap((retorno) => console.log('Fluxo TAP', retorno)),

    )
      .subscribe((usuarios) => {
        this.usuariosSubject.next(usuarios);
      })

    return this.usuariosSubject.asObservable();
  }

  getUsuarioById(id: string): Observable<User> {
    return this.http.get<User>(`${this.API}/users/?id=${id}`);
  }

  createUsuario(values: CreateUser): Observable<CreateUser> {
    return this.http.post<CreateUser>(`${this.API}/users/create`, values);
  }

  updateUsuario(values: UpdateUser, id: number): Observable<UpdateUser> {
    console.log('Values => ', values)
    return this.http.patch<UpdateUser>(`${this.API}/users/update/${id}`, values);
  }

  getUsuarioLogs(values?: any): Observable<UserLogs[]> {

    console.log('values => ', values)
    let params = new HttpParams();
    for (const key in values) {
      params = params.append(key, values[key]);
    }
    return this.http.get<UserLogs[]>(`${this.API}/users/logs`, { params: params });
  }

  
}
