import { Component, OnInit } from '@angular/core';
import { Client } from '../model/client.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../services/client.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Type } from '../model/type.model';

@Component({
  selector: 'app-update-client',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './update-client.component.html',
  styles: ``
})
export class UpdateClientComponent implements OnInit {
  currentClient = new Client();

  types!: Type[];
  updatedTypeId?: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private clientService: ClientService
  ) {}

ngOnInit() {
  this.clientService.listeTypes().subscribe(wrapper => {
    this.types = wrapper._embedded.types; 
    console.log('Loaded types:', this.types);
  });
    this.clientService
      .consulterClient(this.activatedRoute.snapshot.params['id'])
      .subscribe((client) => {
        this.currentClient = client;
        this.updatedTypeId = this.currentClient.type.idType;
      });
  }

  updateClient() {
    this.currentClient.type = this.types.find(
      (type) => type.idType == this.updatedTypeId
    )!;
        this.clientService.updateClient(this.currentClient).subscribe(() => {
      this.router.navigate(['clients']);
    });
  }
}