import { Component, OnInit } from '@angular/core';
import { PriseEnChargeService } from '../../../../core/services/prise-en-charge.service';
import { PriseEnCharge } from '../../../models/prise-en-charge.model';

@Component({
  selector: 'app-priseencharge',
  templateUrl: './priseencharge.component.html',
  styleUrls: ['./priseencharge.component.css']
})
export class PriseenchargeComponent implements OnInit {
  utilisateurId: number = 1; // ID par défaut ou à modifier
  prisesEnCharge: PriseEnCharge[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private priseEnChargeService: PriseEnChargeService) {}

  ngOnInit(): void {
    this.loadPrisesEnCharge();
  }

  loadPrisesEnCharge(): void {
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