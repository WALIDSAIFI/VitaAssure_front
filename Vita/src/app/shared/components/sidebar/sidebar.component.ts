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
      title: 'Tableau de bord ',
      icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
      route: '/admin',
      roles: ['ADMINISTRATEUR']
    },

    {
      title: 'Validation Présence Chargé',
      icon: 'M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z',
      route: '/validationprise',
      roles: ['ADMINISTRATEUR']
    },
    {
      title: 'Validation Dossiers',
      icon: 'M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z',
      route: '/dossier', 
      roles: ['ADMINISTRATEUR']
    },
   
    {
      title: 'Tableau de Bord Adhérent',
      icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
      route: '/dashboard',
      roles: ['ADHERENT']
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
      route: '/addossiers',
      roles: ['ADHERENT']
    },
    {
      title: 'Liste des Dossiers',
      icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
      route: '/listdossier',
      roles: ['ADHERENT']
    },
    {
      title: 'Ajouter Prise en Charge',
      icon: 'M12 4v16m8-8H4',
      route: '/addprise',
      roles: ['ADHERENT']
    },
    {
      title: 'Liste des  Prise en Charge',
      icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
      route: '/prise',
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