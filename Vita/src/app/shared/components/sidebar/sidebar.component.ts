import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  isOpen = true;
  userRole: string = '';
  filteredMenuItems: any[] = [];

  allMenuItems = [
    {
      title: 'Tableau de bord',
      icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
      route: '/dashboard',
      roles: ['ADMINISTRATEUR']
    },
    {
      title: 'Validation utilisateurs',
      icon: 'M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
      route: '/admin/utilisateurs',
      roles: ['ADMINISTRATEUR']
    },
    {
      title: 'Ajouter Dossier',
      icon: 'M12 4v16m8-8H4',
      route: '/dossiers/nouveau',
      roles: ['ADHERENT']
    },
    {
      title: 'Liste des Dossiers',
      icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
      route: '/dossiers',
      roles: ['ADHERENT']
    },
    {
      title: 'Prise en Charge',
      icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
      route: '/prises-en-charge',
      roles: ['ADHERENT']
    }
  ];

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit() {
    this.userService.getCurrentUser().subscribe(user => {
      this.userRole = user.role ?? '';
      this.filterMenuItems();
    });
  }

  filterMenuItems() {
    this.filteredMenuItems = this.allMenuItems.filter(item => 
      item.roles.includes(this.userRole)
    );
  }

  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }

  navigate(route: string) {
    this.router.navigate([route]);
  }
}