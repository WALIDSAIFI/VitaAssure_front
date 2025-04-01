import { Component, OnInit } from '@angular/core';
import { DossierService, Dossier } from '../../../../core/services/dossier.service';

@Component({
  selector: 'app-dossier',
  
  templateUrl: './dossier.component.html',
  styleUrls: ['./dossier.component.css']
})
export class DossierComponent implements OnInit {
  dossiers: Dossier[] = [];
  loadingItems = Array(5).fill(0); // Pour le skeleton loading
  isLoading = true;
  errorMessage = '';
  currentPage = 0;
  pageSize = 8;
  totalDossiers = 0;

  constructor(private dossierService: DossierService) {}

  ngOnInit(): void {
    this.loadDossiers();
  }

  loadDossiers(): void {
    this.isLoading = true;
    this.dossierService.getAll(this.currentPage, this.pageSize).subscribe({
      next: (response) => {
        this.dossiers = response.content;
        this.totalDossiers = response.totalElements;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors du chargement des dossiers';
        this.isLoading = false;
        console.error(error);
      }
    });
  }

  onPageChange(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.loadDossiers();
      window.scrollTo(0, 0);
    }
  }

  // Méthode utilitaire pour remplacer Math.min dans le template
  min(a: number, b: number): number {
    return Math.min(a, b);
  }

  get totalPages(): number {
    return Math.ceil(this.totalDossiers / this.pageSize);
  }

  getPages(): number[] {
    const pagesToShow = 5;
    if (this.totalPages <= pagesToShow) {
      return Array.from({length: this.totalPages}, (_, i) => i);
    }

    let start = Math.max(0, this.currentPage - Math.floor(pagesToShow/2));
    start = Math.min(start, this.totalPages - pagesToShow);
    
    return Array.from({length: pagesToShow}, (_, i) => start + i);
  }

  getStatusClass(statut: string): string {
    const status = statut?.toUpperCase();
    return {
      'EN_COURS': 'bg-yellow-100 text-yellow-800',
      'VALIDÉ': 'bg-green-100 text-green-800',
      'VALIDE': 'bg-green-100 text-green-800',
      'REJETÉ': 'bg-red-100 text-red-800',
      'ACCEPTE': 'bg-green-100 text-green-800'
    }[status] || 'bg-gray-100 text-gray-800';
  }

  getTypeClass(type: string): string {
    return {
      'DENTAIRE': 'bg-blue-100 text-blue-800',
      'OPTIQUE': 'bg-purple-100 text-purple-800',
      'GENERALISTE': 'bg-green-100 text-green-800',
      'SPECIALISTE': 'bg-yellow-100 text-yellow-800',
      'HOSPITALISATION': 'bg-red-100 text-red-800'
    }[type] || 'bg-gray-100 text-gray-800';
  }


  accepterDossier(dossier: Dossier): void {
    this.dossierService.acceptDossier(dossier.id).subscribe({
      next: () => {
        dossier.statut = 'ACCEPTE'; // Mise à jour locale
        console.log(`Dossier ${dossier.id} accepté`);
      },
      error: (err) => {
        console.error(`Erreur lors de l'acceptation du dossier ${dossier.id}`, err);
      }
    });
  }

  rejeterDossier(dossier: Dossier): void {
    this.dossierService.rejectDossier(dossier.id).subscribe({
      next: () => {
        dossier.statut = 'REJETE'; 
        console.log(`Dossier ${dossier.id} rejeté`);
      },
      error: (err) => {
        console.error(`Erreur lors du rejet du dossier ${dossier.id}`, err);
      }
    });
  }
  
 
}


