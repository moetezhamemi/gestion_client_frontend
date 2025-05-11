import { AuthService } from './../services/auth.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Client } from '../model/client.model';
import { ClientService } from '../services/client.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css'
})
export class ClientsComponent implements OnInit {
  clients!: Client[]; 

  constructor(private clientService: ClientService,
    public authService : AuthService
  ) {}

  ngOnInit() {
    this.chargerClients();
  }

  chargerClients() {
    this.clientService.listeClients().subscribe({
      next: (clis) => {
        console.log('Clients chargés:', clis);
        this.clients = clis;
      },
      error: (err) => {
        console.error('Erreur de chargement:', err);
      }
    });
  }
supprimerClient(c: Client) {
  let conf = confirm("Êtes-vous sûr de vouloir supprimer ce client ?");
  if (conf && c.idclient !== undefined) {
    this.clientService.supprimerClient(c.idclient).subscribe({
      next: () => {
        console.log("Client supprimé");
        this.chargerClients();
      },
      error: (err) => {
        console.error("Échec de la suppression:", err);
      }
    });
  } else if (c.idclient === undefined) {
    console.error("ID client non défini.");
  }
}

}