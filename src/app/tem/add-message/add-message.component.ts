import { Component, OnInit } from '@angular/core';
import { MessageserviceService } from '../messageservice.service';
import { FormBuilder, FormGroup, ReactiveFormsModule  } from '@angular/forms';

@Component({
  selector: 'app-add-message',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-message.component.html',
  styles: ``
})

export class AddMessageComponent implements OnInit {
  formGroup4!: FormGroup;

  constructor(public messageService: MessageserviceService, private fb: FormBuilder) { }
  alumno:string='';

  ngOnInit(): void {
    this.formGroup4 = this.initForm();
  }

  initForm(): FormGroup {
    return this.fb.group({
      nombre:['']
    });
  }



  addAlumno(): void {
    let {nombre} = this.formGroup4.value;
    this.messageService.add(nombre);
    this.formGroup4.get('nombre')?.setValue('')
  }
}