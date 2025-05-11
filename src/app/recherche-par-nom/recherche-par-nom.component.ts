import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ClientService } from '../services/client.service';
import { Client } from '../model/client.model';
import { FormsModule } from '@angular/forms';
import { SearchFilterPipe } from '../search-filter.pipe';

@Component({
  selector: 'app-recherche-par-nom',
  imports: [FormsModule,CommonModule,SearchFilterPipe],
  templateUrl: './recherche-par-nom.component.html',
  styles: ``
})
export class RechercheParNomComponent implements OnInit {
  nomClient!: string;
  clients!: Client[];
  allClients!: Client[];
  searchTerm!: string;


  constructor(private clientService: ClientService) { }

ngOnInit(): void {
this.clientService.listeClients().subscribe(cls => {
console.log(cls);
this.clients = cls;
});
}

onKeyUp(filterText: string) {
  const searchText = filterText.toLowerCase();
  this.clients = this.allClients.filter(client =>
    client.nomclient!.toLowerCase().includes(searchText)
  );
}

  chargerClients() {
    this.clientService.listeClients().subscribe({
      next: (clients) => {
        console.log('Clients chargés:', clients);
        this.clients = clients;
      },
      error: (err) => {
        console.error('Erreur de chargement:', err);
      }
    });
  }
rechercherClients() {
  if (this.nomClient?.trim()) {
 
    this.clientService.rechercherParNom(this.nomClient.trim())
      .subscribe({
        next: (clients) => {
          console.log('Clients trouvés:', clients);
          this.clients = clients;
        },
        error: (err) => {
          console.error('Erreur de recherche:', err);
        }
      });
  } else {
 
    this.clientService.listeClients()
      .subscribe({
        next: (clients) => {
          console.log('Tous les clients:', clients);
          this.clients = clients;
        },
        error: (err) => {
          console.error('Erreur de chargement:', err);
        }
      });
  }
}
}
