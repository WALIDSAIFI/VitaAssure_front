import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HomeAdhComponent } from './components/dashboard-adh/home-adh/home-adh.component';
import { ProfilComponent } from './components/dashboard-adh/profil/profil.component';
import { HomeAdminComponent } from './components/dashboard-admin/home-admin/home-admin.component';
import { UtilisateursComponent } from './components/dashboard-admin/utilisateurs/utilisateurs.component';

@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent,
    HomeAdhComponent,
    ProfilComponent,
    HomeAdminComponent,
    UtilisateursComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    NavbarComponent,
    SidebarComponent,
    HomeAdhComponent,
    ProfilComponent,
    HomeAdminComponent,
    UtilisateursComponent
  ]
})
export class SharedModule { }
