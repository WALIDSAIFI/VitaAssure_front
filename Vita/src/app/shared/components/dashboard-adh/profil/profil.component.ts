import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';

interface Professor {
  id?: number;
  nom: string;
  prenom: string;
  email: string;
  telephone?: string;
  dateNaissance?: string;
  adresse?: string;
  situationFamiliale?: string;
  status?: 'actif' | 'inactif';
}

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  currentUser: Professor | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.currentUser = {
        id: user.id,
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
        telephone: user.telephone,
        dateNaissance: user.dateNaissance,
        adresse: user.adresse,
        situationFamiliale: user.situationFamiliale,
        status: 'actif'
      };
    }
  }

  modifierProfil() {
    console.log('Modification du profil');
  }

  changerMotDePasse() {
    console.log('Changement de mot de passe');
  }
}
