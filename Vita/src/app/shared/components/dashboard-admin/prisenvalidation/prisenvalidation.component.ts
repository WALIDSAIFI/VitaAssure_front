import { Component, OnInit } from '@angular/core';
import { PriseEnChargeService } from '../../../../core/services/prise-en-charge.service';
import { PriseEnCharge, StatutPriseEnCharge } from '../../../../shared/models/prise-en-charge.model';

@Component({
  selector: 'app-prisenvalidation',
  templateUrl: './prisenvalidation.component.html',
  styleUrls: ['./prisenvalidation.component.css']
})
export class PrisenvalidationComponent implements OnInit {
  prisesEnCharge: PriseEnCharge[] = [];
  isLoading = false;

  constructor(
    private priseEnChargeService: PriseEnChargeService
  ) {}

  ngOnInit(): void {
    this.loadPrisesEnCharge();
  }

  loadPrisesEnCharge(): void {
    this.isLoading = true;
    this.priseEnChargeService.getAll().subscribe(
      (data) => {
        this.prisesEnCharge = data;
        this.isLoading = false;
      },
      (error) => {
        console.error('Erreur lors du chargement des prises en charge', error);
        this.isLoading = false;
      }
    );
  }

  validerPriseEnCharge(id: number): void {
    this.isLoading = true;
    this.priseEnChargeService.accepterPriseEnCharge(id).subscribe(
      (updatedPec) => {
        this.updatePriseEnChargeInList(updatedPec);
        this.isLoading = false;
      },
      (error) => {
        console.error('Erreur lors de la validation', error);
        this.isLoading = false;
      }
    );
  }

  rejeterPriseEnCharge(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir rejeter cette prise en charge ?')) {
      this.isLoading = true;
      this.priseEnChargeService.rejeterPriseEnCharge(id).subscribe(
        (updatedPec) => {
          this.updatePriseEnChargeInList(updatedPec);
          this.isLoading = false;
        },
        (error) => {
          console.error('Erreur lors du rejet', error);
          this.isLoading = false;
        }
      );
    }
  }

  private updatePriseEnChargeInList(updatedPec: PriseEnCharge): void {
    const index = this.prisesEnCharge.findIndex(pec => pec.id === updatedPec.id);
    if (index !== -1) {
      this.prisesEnCharge[index] = updatedPec;
    }
  }
}