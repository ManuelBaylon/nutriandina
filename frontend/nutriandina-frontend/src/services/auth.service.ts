import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, tap } from "rxjs";
import { LoginResponse } from "../model/loginresponse.model";

@Injectable({ providedIn: 'root' })
export class AuthenticationToken {
  private http = inject(HttpClient);
  private apiUrl = 'http://127.0.0.1:8000/api/';

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.apiUrl + 'login/', { username, password }).pipe(
      tap(response => {
        sessionStorage.setItem('token', response.token);
      })
    );
  }
  registro(datos: { username: string; password: string; nombres: string; apellidos: string; dni?: string }): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'registro/', datos);
  }

  getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  limpiarSesion(): void {
    sessionStorage.removeItem('token');
  }

  logout(): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'logout/', {}).pipe(tap(() => this.limpiarSesion()));
  }
}