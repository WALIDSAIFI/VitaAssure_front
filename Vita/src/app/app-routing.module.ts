import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeAdhComponent } from './shared/components/dashboard-adh/home-adh/home-adh.component';
import { ProfilComponent } from './shared/components/dashboard-adh/profil/profil.component';
import { HomeAdminComponent } from './shared/components/dashboard-admin/home-admin/home-admin.component';
import { UtilisateursComponent } from './shared/components/dashboard-admin/utilisateurs/utilisateurs.component';
import { AddDossierComponent } from './shared/components/dashboard-adh/add-dossier/add-dossier.component';
import {ListdossierComponent} from './shared/components/dashboard-adh/listdossier/listdossier.component';
import {PriseenchargeComponent} from './shared/components/dashboard-adh/priseencharge/priseencharge.component'
import { AddpriseenchargeComponent } from './shared/components/dashboard-adh/addpriseencharge/addpriseencharge.component';
import { DossierComponent } from './shared/components/dashboard-admin/dossier/dossier.component';
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: HomeAdhComponent },
  { path: 'profil', component: ProfilComponent },
  { path: 'admin', component: HomeAdminComponent },
  { path: 'admin/utilisateurs', component: UtilisateursComponent },
  {path: 'addossiers', component: AddDossierComponent },
  {path :'listdossier' , component : ListdossierComponent},
  {path: 'admin', component: HomeAdminComponent },
  { path: 'prise', component : PriseenchargeComponent},
  { path : 'addprise', component: AddpriseenchargeComponent},
  { path :'dossier', component : DossierComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
