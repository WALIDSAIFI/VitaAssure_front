import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-utilisateurs',
  templateUrl: './utilisateurs.component.html',
  styleUrls: ['./utilisateurs.component.css']
})
export class UtilisateursComponent implements OnInit {
  users: any[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit() {
    // Ici, vous devrez appeler votre service pour récupérer la liste des utilisateurs
    // Pour l'instant, on utilise des données fictives
    this.users = [
      {
        nom: 'Dupont',
        prenom: 'Jean',
        email: 'jean.dupont@example.com',
        telephone: '0612345678'
      },
      // Ajoutez d'autres utilisateurs ici
    ];
  }
}
