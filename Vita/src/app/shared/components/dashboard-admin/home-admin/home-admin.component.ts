import { Component } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent {
  constructor(private authService: AuthService) {
    // Vérifier si l'utilisateur est admin
    if (!this.authService.isAdmin()) {
      // Rediriger si pas admin
      this.authService.logout();
    }
  }
}
