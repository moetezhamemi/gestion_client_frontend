import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Type } from '../model/type.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-type',
  imports: [FormsModule],
  templateUrl: './update-type.component.html',
  styles: ``
})

export class UpdateTypeComponent implements OnInit {
@Input()
type!: Type; 
@Output()
typeUpdated = new EventEmitter<Type>();
@Input()
ajout!:boolean;

ngOnInit(): void {
  console.log("ngOnInit du composant UpdateType ", this.type);
}
saveType() {
  this.typeUpdated.emit(this.type);
}
}
