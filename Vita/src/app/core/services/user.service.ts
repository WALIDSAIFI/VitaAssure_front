import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


export interface User {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  telephone?: string;
  dateNaissance?: string;
  adresse?: string;
  situationFamiliale?: string;
  valider: boolean;
  role: 'ADMINISTRATEUR' | 'ADHERENT';
}


interface UserResponse {
  content: User[];
  totalElements: number;
  totalPages: number;
}
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) { }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/me`);
  }

  updateUser(userId: number, userData: Partial<User>): Observable<User> {
    return this.http.put<User>(`http://localhost:8080/api/utilisateurs/${userId}`, userData);
  }




  getAllUsers(page: number = 0, size: number = 10): Observable<User[]> {
    return this.http.get<UserResponse>(
      `http://localhost:8080/api/utilisateurs?page=${page}&size=${size}`
    ).pipe(
      map((response: UserResponse) => response.content) 
    );
  }

  validateUser(userId: number): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(
      `http://localhost:8080/api/utilisateurs/validate/${userId}`,
      {}
    );
  }
  
}