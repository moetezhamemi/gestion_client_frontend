import { Component, OnInit } from '@angular/core';
import { Client } from '../model/client.model';
import { Type } from '../model/type.model';
import { ClientService } from '../services/client.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-recherche-par-type',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './recherche-par-type.component.html',
  styles: ``
})
export class RechercheParTypeComponent implements OnInit {

  clients!: Client[];
  idType!: number;
  types!: Type[];

  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    this.clientService.listeTypes().subscribe({
      next: (response) => {
        this.types = response._embedded.types;
        console.log('Types loaded:', this.types);
      },
      error: (err) => {
        console.error('Error loading types:', err);
      }
    });
  }

  onChange() {
    if (this.idType) {
      this.clientService.rechercherParType(this.idType).subscribe({
        next: (clients) => {
          this.clients = clients;
          console.log('Filtered clients:', clients);
        },
        error: (err) => {
          console.error('Error filtering clients:', err);
        }
      });
    }
  }
}