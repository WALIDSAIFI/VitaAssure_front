import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DossierService } from '../../../../core/services/dossier.service';
import { Router } from '@angular/router';
import { AuthService, User } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-add-dossier',
  templateUrl: './add-dossier.component.html',
  styleUrls: ['./add-dossier.component.css']
})
export class AddDossierComponent implements OnInit {
  dossierForm: FormGroup;
  traitementTypes = ['DENTAIRE', 'OPTIQUE', 'GENERALISTE', 'SPECIALISTE', 'HOSPITALISATION'];
  currentUser: User | null = null;

  constructor(
    private fb: FormBuilder,
    private dossierService: DossierService,
    private authService: AuthService,
    private router: Router
  ) {
    this.dossierForm = this.fb.group({
      utilisateurId: [{ value: '', disabled: true }, Validators.required], 
      typeTraitement: ['', Validators.required],
      commentaire: ['', Validators.required],
      totalFrais: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    if (this.currentUser) {
      this.dossierForm.patchValue({ utilisateurId: this.currentUser.id }); // Pré-remplissage du champ utilisateurId
    } else {
      alert("Aucun utilisateur connecté !");
      this.router.navigate(['/login']);
    }
  }

 
  onSubmit() {
    if (this.dossierForm.valid) {
      const dossier = {
        ...this.dossierForm.value,
        utilisateurId: this.authService.getCurrentUser()?.id, // Récupérer l'utilisateur connecté
        totalFrais: Number(this.dossierForm.value.totalFrais) // Convertir en number
      };
  
      console.log('Données envoyées à l\'API:', dossier); // 🔍 Vérifier la valeur envoyée
  
      this.dossierService.createDossier(dossier).subscribe({
        next: () => {
          alert('Dossier créé avec succès !');
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.error('Erreur lors de la création du dossier :', err);
          alert('Erreur lors de la création du dossier. Veuillez réessayer.');
        }
      });
    }
  }
  
  convertTotalFrais() {
    this.dossierForm.patchValue({
      totalFrais: Number(this.dossierForm.value.totalFrais)
    });
  }
  
}
