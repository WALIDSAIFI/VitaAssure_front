import { Component, OnInit } from '@angular/core';
import { User, UserService } from '../../../../core/services/user.service'; 



@Component({
  selector: 'app-utilisateurs',
  templateUrl: './utilisateurs.component.html',
  styleUrls: ['./utilisateurs.component.css']
})
export class UtilisateursComponent implements OnInit {

  users: User[] = [];
  isLoading = true;
  errorMessage = '';
  currentPage = 0;
  pageSize = 10;
  totalUsers = 0;


  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.isLoading = true;
    this.userService.getAllUsers(this.currentPage, this.pageSize).subscribe({
      next: (users) => {
        this.users = users;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Erreur lors du chargement des utilisateurs';
        this.isLoading = false;
        console.error('Error loading users:', err);
      }
    });

    JSON.stringify(this.users);
  }

  getStatusClass(isValid: boolean): string {
    return isValid 
      ? 'inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800'
      : 'inline-flex rounded-full bg-red-100 px-2 text-xs font-semibold leading-5 text-red-800';
  }

 
  nextPage() {
    this.currentPage++;
    this.loadUsers();
  }

  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadUsers();
    }
  }

  validateUser(userId: number) {
    this.userService.validateUser(userId).subscribe({
      next: (response) => {
        this.errorMessage = ''; // Réinitialiser le message d'erreur
        alert(response.message);
        this.loadUsers();
      }
    });
  }
  

 
bloquerUser(userId: number) {
  if (confirm('Êtes-vous sûr de vouloir bloquer cet utilisateur ?')) {
    this.userService.bloquerUser(userId).subscribe({
      next: (response) => {
        alert(response.message); 
        this.loadUsers(); // Recharger la liste des utilisateurs
      },
  
    });
  }
}
  
}