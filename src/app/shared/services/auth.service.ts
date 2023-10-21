import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ChangePassword, Login, LoginResponse } from '../models/login';

const KEY = 'token';
const API = environment.API;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient) {
    this.setIsAuthenticated(!!this.returnToken());
   }

  public setIsAuthenticated(value: boolean): void {
    this.isAuthenticatedSubject.next(value);
  }

  public getIsAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  returnToken(){
    return localStorage.getItem(KEY) || '';
  }

  saveToken(token: string) {
    localStorage.setItem(KEY, token);
    this.setIsAuthenticated(true);
  }

  deleteToken(){
      localStorage.removeItem(KEY);
      this.setIsAuthenticated(false);
  }

  haveToken() {
    const hasToken = !!this.returnToken();
    return hasToken;
  }

  login(login: Login): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${API}/users/login`, login);
  }

  changePassword(values: ChangePassword): Observable<ChangePassword> {
    return this.http.patch<ChangePassword>(`${API}/users/update-password`, values);
  }

  
}
