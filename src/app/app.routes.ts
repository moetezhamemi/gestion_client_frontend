import { Routes } from '@angular/router';
import { ClientsComponent } from './clients/clients.component';
import { AddClientComponent } from './add-client/add-client.component';
import { UpdateClientComponent, } from './update-client/update-client.component';
import { RechercheParTypeComponent } from './recherche-par-type/recherche-par-type.component';
import { RechercheParNomComponent } from './recherche-par-nom/recherche-par-nom.component';
import { ListeTypesComponent } from './liste-types/liste-types.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { clientGuard } from './client.guard';

export const routes: Routes = [
    {path: "clients", component :ClientsComponent},
    {path: "add-client", component :AddClientComponent,canActivate:[clientGuard]},
    {path: "rechercheParType", component :RechercheParTypeComponent},
    {path: "rechercheParNom", component :RechercheParNomComponent},
    {path: "listeTypes", component :ListeTypesComponent},
    {path: 'login', component: LoginComponent},
    {path: 'app-forbidden', component: ForbiddenComponent},
    {path: "updateClient/:id", component :UpdateClientComponent},
    {path: "", redirectTo: "clients", pathMatch: "full"}

];
