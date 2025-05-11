import { ClientService } from './../services/client.service';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Client } from '../model/client.model';
import { Type } from '../model/type.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-client',
  imports: [FormsModule,CommonModule],
  templateUrl: './add-client.component.html',
  styleUrl: './add-client.component.css'
})
export class AddClientComponent implements OnInit {

  newClient = new Client();
  message!: string;
  types!: Type[];
  newIdType!: number;
  newType!: Type;

  constructor(
    private clientService: ClientService,
    private router: Router
  ) {}

ngOnInit() {
  this.clientService.listeTypes().subscribe(wrapper => {
    this.types = wrapper._embedded.types; 
    console.log('Loaded types:', this.types);
  });
}

  addClient() {
    this.newClient.type = this.types.find(type => type.idType == this.newIdType)!;
    this.clientService.ajouterClient(this.newClient)
      .subscribe({
        next: (client) => {
          console.log('Client added:', client);
          this.router.navigate(['clients']);
        },
        error: (err) => {
          console.error('Error adding client:', err);
          this.message = "Failed to add client";
        }
      });
  }
}
