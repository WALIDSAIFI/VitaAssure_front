import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

export interface User {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  role: 'ADMINISTRATEUR' | 'ADHERENT';
  isValidated?: boolean;
  dateNaissance?: string;
  adresse?: string;
  telephone?: string;
  situationFamiliale?: string;
}

export interface LoginResponse {
  userId: number;
  email: string;
  token: string;
  message: string;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
}

export interface RegisterData {
  nom: string;
  prenom: string;
  email: string;
  password: string;
  dateNaissance: string;
  adresse: string;
  telephone: string;
  situationFamiliale: 'CELIBATAIRE' | 'MARIE' | 'DIVORCE';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  private readonly API_URL = 'http://localhost:8080/api/auth';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    const token = localStorage.getItem('token');
    if (token) {
      const user = this.decodeToken(token);
      this.currentUserSubject.next(user);
    }
  }

  login(credentials: { email: string; password: string }): Observable<LoginResponse> {
    console.log('Tentative de connexion avec:', credentials);

    return this.http.post<LoginResponse>(`${this.API_URL}/login`, credentials)
      .pipe(
        tap(response => {
          console.log('Réponse du serveur:', response);
          if (response && response.token) {
            localStorage.setItem('token', response.token);
            
            // Décoder le token pour obtenir les informations de l'utilisateur
            const user = this.decodeToken(response.token);
            this.currentUserSubject.next(user);
          }
        }),
        catchError((error: HttpErrorResponse) => {
          console.error('Login error:', error);
          if (error.status === 401) {
            return throwError(() => new Error('Email ou mot de passe incorrect'));
          } else if (error.status === 500) {
            return throwError(() => new Error('Une erreur interne s\'est produite'));
          }
          return throwError(() => new Error(error.error?.message || 'Erreur de connexion'));
        })
      );
  }

  register(data: RegisterData): Observable<RegisterResponse> {
    // Formatage des données avant envoi
    const formattedData = {
      ...data,
      dateNaissance: new Date(data.dateNaissance).toISOString().split('T')[0],
      role: 'ADHERENT' // Définir le rôle par défaut
    };

    console.log('Données formatées pour l\'inscription:', formattedData);

    return this.http.post<RegisterResponse>(`${this.API_URL}/register`, formattedData)
      .pipe(
        tap(response => {
          console.log('Réponse inscription:', response);
        }),
        catchError((error: HttpErrorResponse) => {
          console.error('Erreur inscription détaillée:', error);
          
          if (error.status === 400) {
            return throwError(() => new Error(error.error?.message || 'Données invalides'));
          } else if (error.status === 409) {
            return throwError(() => new Error('Cet email est déjà utilisé'));
          } else if (error.status === 500) {
            console.error('Erreur serveur détaillée:', error.error);
            return throwError(() => new Error('Une erreur interne s\'est produite'));
          }
          
          return throwError(() => new Error(error.error?.message || 'Erreur lors de l\'inscription'));
        })
      );
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  logout(): void {
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  isAdmin(): boolean {
    return this.currentUserSubject.value?.role === 'ADMINISTRATEUR';
  }

  isAdherent(): boolean {
    return this.currentUserSubject.value?.role === 'ADHERENT';
  }

  private decodeToken(token: string): User {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return {
        id: payload.userId || payload.id,
        nom: payload.nom,
        prenom: payload.prenom,
        email: payload.email,
        role: payload.role,
        isValidated: payload.isValidated,
        dateNaissance: payload.dateNaissance,
        adresse: payload.adresse,
        telephone: payload.telephone,
        situationFamiliale: payload.situationFamiliale
      };
    } catch (error) {
      console.error('Token decode error:', error);
      this.logout();
      throw new Error('Token invalide');
    }
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}