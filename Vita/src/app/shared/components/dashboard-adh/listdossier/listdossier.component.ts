// listdossier.component.ts
import { Component, OnInit } from '@angular/core';
import { DossierService, Dossier } from '../../../../core/services/dossier.service';
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listdossier',
  templateUrl: './listdossier.component.html',
  styleUrls: ['./listdossier.component.css']
})
export class ListdossierComponent implements OnInit {
  dossiers: Dossier[] = [];
  userId: number | null = null;

  constructor(private dossierService: DossierService, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.userId = user.id;
      this.loadDossiers();
    }
  }

  loadDossiers(): void {
    if (this.userId) {
      this.dossierService.getDossiersByUser(this.userId).subscribe(
        (data) => this.dossiers = data.content,
        (error) => console.error('Erreur lors du chargement des dossiers', error)
      );
    }
  }

  editDossier(id: number): void {
    this.router.navigate(['/modifier-dossier', id]);
  }
}
