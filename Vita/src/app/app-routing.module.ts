import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeAdhComponent } from './shared/components/dashboard-adh/home-adh/home-adh.component';
import { ProfilComponent } from './shared/components/dashboard-adh/profil/profil.component';
import { HomeAdminComponent } from './shared/components/dashboard-admin/home-admin/home-admin.component';
import { UtilisateursComponent } from './shared/components/dashboard-admin/utilisateurs/utilisateurs.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: HomeAdhComponent },
  { path: 'profil', component: ProfilComponent },
  { path: 'admin', component: HomeAdminComponent },
  { path: 'admin/utilisateurs', component: UtilisateursComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
