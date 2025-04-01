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

  constructor(private priseEnChargeService: PriseEnChargeService) {}

  ngOnInit(): void {
    this.loadPrisesEnCharge();
  }

  loadPrisesEnCharge(): void {
    this.priseEnChargeService.getAll().subscribe(
      (data) => {
        this.prisesEnCharge = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des prises en charge', error);
      }
    );
  }

  validerPriseEnCharge(id: number): void {
    // Implémentez la logique de validation ici
    console.log(`Validation de la prise en charge ${id}`);
    // Exemple: this.priseEnChargeService.valider(id).subscribe(...);
  }

  rejeterPriseEnCharge(id: number): void {
    // Implémentez la logique de rejet ici
    console.log(`Rejet de la prise en charge ${id}`);
    // Exemple: this.priseEnChargeService.rejeter(id).subscribe(...);
  }
}