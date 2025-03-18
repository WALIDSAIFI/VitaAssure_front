import { Injectable } from '@angular/core';

export interface User {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Données mockées pour le développement frontend
  private mockUser: User = {
    id: 1,
    nom: 'Doe',
    prenom: 'John',
    email: 'john.doe@example.com',
    role: 'ADHERENT'
  };

  getCurrentUser(): User {
    return this.mockUser;
  }

  logout(): void {
    // Pour le moment, on ne fait rien
    console.log('Déconnexion...');
  }
} 