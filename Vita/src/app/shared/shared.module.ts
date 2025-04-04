import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HomeAdhComponent } from './components/dashboard-adh/home-adh/home-adh.component';
import { ProfilComponent } from './components/dashboard-adh/profil/profil.component';
import { HomeAdminComponent } from './components/dashboard-admin/home-admin/home-admin.component';
import { UtilisateursComponent } from './components/dashboard-admin/utilisateurs/utilisateurs.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddDossierComponent } from './components/dashboard-adh/add-dossier/add-dossier.component';
import { ListdossierComponent } from './components/dashboard-adh/listdossier/listdossier.component';
import { PriseenchargeComponent } from './components/dashboard-adh/priseencharge/priseencharge.component';
import { AddpriseenchargeComponent } from './components/dashboard-adh/addpriseencharge/addpriseencharge.component';
import { DossierComponent } from './components/dashboard-admin/dossier/dossier.component';
import { PrisenchargeComponent } from './components/dashboard-admin/prisencharge/prisencharge.component';
import { PrisenvalidationComponent } from './components/dashboard-admin/prisenvalidation/prisenvalidation.component';

@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent,
    HomeAdhComponent,
    ProfilComponent,
    HomeAdminComponent,
    UtilisateursComponent,
    AddDossierComponent,
    ListdossierComponent,
    PriseenchargeComponent,
    AddpriseenchargeComponent,
    DossierComponent,
    PrisenchargeComponent,
    PrisenvalidationComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([]) 
  ],
  exports: [
    NavbarComponent,
    SidebarComponent,
    HomeAdhComponent,
    ProfilComponent,
    HomeAdminComponent,
    UtilisateursComponent,
    AddDossierComponent, 
    ListdossierComponent
  ]
})
export class SharedModule { }
