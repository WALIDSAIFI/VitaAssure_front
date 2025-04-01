import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Dossier {
  id : number;
  utilisateurId: number;
  typeTraitement: 'DENTAIRE' | 'OPTIQUE' | 'GENERALISTE' | 'SPECIALISTE' | 'HOSPITALISATION';
  commentaire: string;
  statut: string;
  totalFrais: number ;
}

@Injectable({
  providedIn: 'root'
})
export class DossierService {
  private apiUrl = 'http://localhost:8080/api/dossiers';

  constructor(private http: HttpClient) { }

   getAll(page: number = 0, size: number = 8): Observable<{ content: Dossier[], totalElements: number }> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    
    return this.http.get<{ content: Dossier[], totalElements: number }>(this.apiUrl, { params });
  }

  createDossier(dossier: Dossier): Observable<Dossier> {
    return this.http.post<Dossier>(this.apiUrl, dossier);
  }

  getDossiersByUser(userId: number): Observable<{ content: Dossier[] }> {
    return this.http.get<{ content: Dossier[] }>(`${this.apiUrl}/utilisateur/${userId}`);
  }
}
