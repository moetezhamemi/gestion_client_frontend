import { Component, Input } from '@angular/core';
import { ClientService } from '../services/client.service';
import { Type } from '../model/type.model';
import { UpdateTypeComponent } from "../update-type/update-type.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-liste-types',
  imports: [UpdateTypeComponent,CommonModule,FormsModule],
  templateUrl: './liste-types.component.html',
  styles: ``
})
export class ListeTypesComponent {
  types!: Type[];
  updatedType: Type = {"idType":0,"nomType":"",  descriptionType: ""};
  ajout:boolean=true;
  newType: Type = new Type();

constructor(private clientService: ClientService) { }
ngOnInit(): void {
  this.clientService.listeTypes().
    subscribe(types => {this.types = types._embedded.types;
      console.log(types);
    });
}
updateType(type: Type) {
  this.updatedType = type;
  this.ajout = false;
}
chargerTypes() {
  this.clientService.listeTypes().
    subscribe(types => {
      this.types = types._embedded.types;
      console.log(types);
    });
}
typeUpdated(type: Type) {
  console.log("Type updated event", type);
  
const typeToSend = this.ajout ? 
  { nomType: type.nomType, descriptionType: type.descriptionType } : 
  type;

  this.clientService.ajouterType(typeToSend).subscribe({
    next: () => {
      this.chargerTypes();
      this.ajout = true;
      this.updatedType = {idType:0, nomType:"", descriptionType: ""}; 
    },
  });
}



}
