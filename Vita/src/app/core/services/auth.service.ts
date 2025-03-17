import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoginModel, RegisterModel } from '../../shared/models/auth.model';

const API_URL = 'http://localhost:8080/api/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(credentials: LoginModel): Observable<any> {
    return this.http.post(`${API_URL}/login`, credentials).pipe(
      tap((response: any) => {
        if (response && response.token) {
          // Stockage du token
          localStorage.setItem('token', response.token);
          // Stockage des informations utilisateur si nécessaire
          if (response.user) {
            localStorage.setItem('user', JSON.stringify(response.user));
          }
        }
      })
    );
  }

  register(userData: RegisterModel): Observable<any> {
    return this.http.post(`${API_URL}/register`, userData);
  }

  // Méthode pour vérifier si l'utilisateur est connecté
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  // Méthode pour récupérer le token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Méthode pour récupérer les informations de l'utilisateur
  getCurrentUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  // Méthode pour déconnecter l'utilisateur
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
} 