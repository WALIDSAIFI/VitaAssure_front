import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PriseEnChargeService } from '../../../../core/services/prise-en-charge.service';
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addpriseencharge',
  templateUrl: './addpriseencharge.component.html',
  styleUrls: ['./addpriseencharge.component.css']
})
export class AddpriseenchargeComponent implements OnInit {
  priseEnChargeForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private priseEnChargeService: PriseEnChargeService,
    private authService: AuthService,
    private router: Router
  ) {
    this.priseEnChargeForm = this.fb.group({
      description: ['', Validators.required],
      montantEstime: ['', [Validators.required, Validators.min(1)]],
      dateDemande: ['', Validators.required],
      commentaire: [''],
      statut: ['EN_ATTENTE']
    });
  }

  ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      this.router.navigate(['/login']);
    }
  }

  soumettrePriseEnCharge(): void {
    if (this.priseEnChargeForm.invalid) {
      this.markFormGroupTouched(this.priseEnChargeForm);
      return;
    }

    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      console.error("Utilisateur non connecté.");
      alert("Erreur : utilisateur non connecté.");
      return;
    }

    const formData = {
      ...this.priseEnChargeForm.value,
      utilisateurId: currentUser.id
    };

    this.priseEnChargeService.ajouterPriseEnCharge(formData)
      .subscribe({
        next: () => {
          alert("Prise en charge ajoutée avec succès !");
          this.router.navigate(['/prise']);
        },
        error: (error) => {
          console.error("Erreur lors de l'ajout :", error);
          alert(`Erreur lors de l'ajout de la prise en charge: ${error.message}`);
        }
      });
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}