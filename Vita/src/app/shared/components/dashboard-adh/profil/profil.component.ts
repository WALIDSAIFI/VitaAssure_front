import { Component, OnInit } from '@angular/core';
import { UserService, User } from '../../../../core/services/user.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  currentUser: User | null = null;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUserProfile();
  }

  loadUserProfile() {
    this.userService.getCurrentUser().subscribe({
      next: (user) => {
        this.currentUser = user;
      },
      error: (error) => {
        console.error('Erreur lors du chargement du profil:', error);
      }
    });
  }

  modifierProfil() {
    console.log('Modification du profil');
  }

  changerMotDePasse() {
    console.log('Changement de mot de passe');
  }
}
