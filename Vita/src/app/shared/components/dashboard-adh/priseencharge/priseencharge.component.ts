import { Component, OnInit } from '@angular/core';
import { PriseEnChargeService } from '../../../../core/services/prise-en-charge.service';
import { PriseEnCharge } from '../../../models/prise-en-charge.model';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-priseencharge',
  templateUrl: './priseencharge.component.html',
  styleUrls: ['./priseencharge.component.css']
})
export class PriseenchargeComponent implements OnInit {
  utilisateurId: number | null = null;
  prisesEnCharge: PriseEnCharge[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private priseEnChargeService: PriseEnChargeService, private authService: AuthService) {}

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    if (user && user.id !== undefined) {
      this.utilisateurId = user.id;
      this.loadPrisesEnCharge();
    } else {
      this.errorMessage = "Utilisateur non trouvé ou ID invalide.";
    }
  }

  loadPrisesEnCharge(): void {
    if (this.utilisateurId === null) {
      this.errorMessage = "Impossible de charger les prises en charge : ID utilisateur manquant.";
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.priseEnChargeService.getPrisesEnChargeByUtilisateurId(this.utilisateurId)
      .subscribe({
        next: (data) => {
          this.prisesEnCharge = data;
          this.isLoading = false;
        },
        error: (err) => {
          this.errorMessage = 'Erreur lors du chargement des prises en charge';
          this.isLoading = false;
          console.error(err);
        }
      });
  }

  onSearch(): void {
    this.loadPrisesEnCharge();
  }
}
