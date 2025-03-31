import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Dossier {
  id : number;
  utilisateurId: number;
  typeTraitement: 'DENTAIRE' | 'OPTIQUE' | 'GENERALISTE' | 'SPECIALISTE' | 'HOSPITALISATION';
  commentaire: string;
  totalFrais: number ;
}

@Injectable({
  providedIn: 'root'
})
export class DossierService {
  private apiUrl = 'http://localhost:8080/api/dossiers';

  constructor(private http: HttpClient) { }

  createDossier(dossier: Dossier): Observable<Dossier> {
    return this.http.post<Dossier>(this.apiUrl, dossier);
  }

  getDossiersByUser(userId: number): Observable<{ content: Dossier[] }> {
    return this.http.get<{ content: Dossier[] }>(`${this.apiUrl}/utilisateur/${userId}`);
  }
}
