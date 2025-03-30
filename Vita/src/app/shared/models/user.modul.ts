// src/app/core/models/user.model.ts
export interface User {
    id: number;
    nom: string;
    prenom: string;
    dateNaissance: string;
    adresse: string;
    telephone: string;
    email: string;
    role: string;
    valider: boolean;
  }
  
  export interface UserResponse {
    id: number;
    nom: string;
    prenom: string;
    dateNaissance: string;
    adresse: string;
    telephone: string;
    email: string;
    role: 'ADHERENT' | 'ADMIN' | 'EMPLOYEE'; 
    valider: boolean;
  }