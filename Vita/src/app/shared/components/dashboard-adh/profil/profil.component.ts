import { Component, OnInit } from '@angular/core';
import { UserService, User } from '../../../../core/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  currentUser: User | null = null;
  isEditing = false;
  profileForm: FormGroup;
  loading = false;

  constructor(
    private userService: UserService,
    private fb: FormBuilder
  ) {
    this.profileForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]], // Add this line
      dateNaissance: [''],
      situationFamiliale: [''],
      telephone: [''],
      adresse: ['']
    });
  }

  ngOnInit() {
    this.loadUserProfile();
  }

  loadUserProfile() {
    this.userService.getCurrentUser().subscribe({
      next: (user) => {
        this.currentUser = user;
        this.profileForm.patchValue({
          nom: user.nom,
          prenom: user.prenom,
          email: user.email, 
          dateNaissance: user.dateNaissance,
          situationFamiliale: user.situationFamiliale,
          telephone: user.telephone,
          adresse: user.adresse
        });
      },
      error: (error) => {
        console.error('Erreur lors du chargement du profil:', error);
      }
    });
  }

  startEditing() {
    this.isEditing = true;
  }

  cancelEditing() {
    this.isEditing = false;
    if (this.currentUser) {
      this.profileForm.patchValue({
        nom: this.currentUser.nom,
        prenom: this.currentUser.prenom,
        dateNaissance: this.currentUser.dateNaissance,
        situationFamiliale: this.currentUser.situationFamiliale,
        telephone: this.currentUser.telephone,
        adresse: this.currentUser.adresse
      });
    }
  }

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.profileForm.valid && this.currentUser) {
      this.loading = true;
      this.userService.updateUser(this.currentUser.id, this.profileForm.value).subscribe({
        next: (updatedUser) => {
          this.currentUser = updatedUser;
          this.isEditing = false;
          this.loading = false;
        },
        error: (error) => {
          console.error('Erreur lors de la mise à jour du profil:', error);
          this.loading = false;
        }
      });
    }
  }

  changerMotDePasse() {
    console.log('Changement de mot de passe');
  }
}