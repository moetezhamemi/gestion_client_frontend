import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Client } from '../model/client.model';
import { Type } from '../model/type.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { TypeWrapper } from '../model/TypeWrapped.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root',
})
export class ClientService {
  clients!: Client[]; 
  client!: Client;
  types!: Type[];
  apiURLType: string = 'http://localhost:9081/clients/types';

    apiURL: string = 'http://localhost:9081/clients/api';


  constructor(private http: HttpClient,private authService : AuthService) {}

listeClients(): Observable<Client[]>{
 return this.http.get<Client[]>(this.apiURL+"/all");
}


ajouterClient(client: Client): Observable<Client> {
  const jwt = "Bearer " + this.authService.getToken();
  const httpHeaders = new HttpHeaders({"Authorization": jwt});
  return this.http.post<Client>(`${this.apiURL}/addclient`, client, {headers: httpHeaders});
}

supprimerClient(id: number): Observable<void> {
  const url = `${this.apiURL}/delclient/${id}`;
  const jwt = "Bearer " + this.authService.getToken();
  const httpHeaders = new HttpHeaders({"Authorization": jwt});
  return this.http.delete<void>(url, {headers: httpHeaders});
}


consulterClient(id: number): Observable<Client> {
  const url = `${this.apiURL}/getbyid/${id}`;
  const jwt = "Bearer " + this.authService.getToken();
  const httpHeaders = new HttpHeaders({"Authorization": jwt});
  return this.http.get<Client>(url, {headers: httpHeaders});
}


updateClient(client: Client): Observable<Client> {
  const jwt = "Bearer " + this.authService.getToken();
  const httpHeaders = new HttpHeaders({"Authorization": jwt});
  return this.http.put<Client>(`${this.apiURL}/updateclient`, client, {headers: httpHeaders});
}
  
listeTypes(): Observable<TypeWrapper> {
  const jwt = "Bearer " + this.authService.getToken();
  const httpHeaders = new HttpHeaders({"Authorization": jwt});
  return this.http.get<TypeWrapper>(this.apiURLType, {headers: httpHeaders});
}
  consulterType(id: number): Observable<Type> {
    return this.http.get<Type>(`${environment.apiURL}/types/${id}`);
  }
rechercherParType(idType: number): Observable<Client[]> {
  const url = `${this.apiURL}/clstype/${idType}`;
  const jwt = "Bearer " + this.authService.getToken();
  const httpHeaders = new HttpHeaders({"Authorization": jwt});
  return this.http.get<Client[]>(url, {headers: httpHeaders});
}

rechercherParNom(nom: string): Observable<Client[]> {
  const url = `${this.apiURL}/clientsbyName/${nom}`;
  const jwt = "Bearer " + this.authService.getToken();
  const httpHeaders = new HttpHeaders({"Authorization": jwt});
  return this.http.get<Client[]>(url, {headers: httpHeaders});
}
ajouterType(type: Type): Observable<Type> {
  const jwt = "Bearer " + this.authService.getToken();
  const httpHeaders = new HttpHeaders({
    "Authorization": jwt,
    "Content-Type": "application/json"
  });
  return this.http.post<Type>(this.apiURLType, type, {headers: httpHeaders});
}
}