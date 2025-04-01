import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PriseEnCharge, PriseEnChargeForm, StatutPriseEnCharge } from '../../shared/models/prise-en-charge.model';

@Injectable({
  providedIn: 'root'
})
export class PriseEnChargeService {
  private readonly API_URL = 'http://localhost:8080/api/prises-en-charge';

  constructor(private http: HttpClient) {}

  ajouterPriseEnCharge(priseEnCharge: PriseEnChargeForm): Observable<PriseEnCharge> {
    const payload = {
      ...priseEnCharge,
      statut: priseEnCharge.statut || StatutPriseEnCharge.EN_ATTENTE
    };
    
    return this.http.post<PriseEnCharge>(this.API_URL, payload, {
      headers: { 'Content-Type': 'application/json' }
    }); 
  }

  getPrisesEnChargeByUtilisateurId(utilisateurId: number): Observable<PriseEnCharge[]> {
    return this.http.get<PriseEnCharge[]>(`${this.API_URL}/utilisateur/${utilisateurId}`);
  }
  getAll(): Observable<PriseEnCharge[]> {
    return this.http.get<PriseEnCharge[]>(this.API_URL);
  }
}