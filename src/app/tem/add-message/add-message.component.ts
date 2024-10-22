import { Component } from '@angular/core';
import { MessageserviceService } from '../messageservice.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule, Validators  } from '@angular/forms';



@Component({
  selector: 'app-add-message',
  standalone: true,
  imports: [],
  templateUrl: './add-message.component.html',
  styles: ``
})

export class AddMessageComponent {
  formGroup4!: FormGroup;
  constructor(public messageService:MessageserviceService){
    
  }

  alumno:string='';

  addAlumno(){
    this.messageService.add(this.alumno);
    this.alumno=""
  }

}
