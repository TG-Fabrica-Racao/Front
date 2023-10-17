import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private readonly API = environment.API;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }


  userIdentify(): Observable<User> {
    return this.http.post<User>(`${this.API}/users/identify`, this.authService.returnToken());
  }
}
