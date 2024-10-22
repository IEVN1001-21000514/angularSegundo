import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule, Validators  } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Trabajador {
  matricula:string;
  nombre: string;
  correo: string;
  edad: number;
  horas: number;
}

@Component({
  selector: 'app-horas-empleados',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './horas-empleados.component.html',
  styles: ``
})


export default class HorasEmpleadosComponent implements OnInit {
  formGroup3!: FormGroup;
  empleados: Trabajador[] = [];


        constructor(private readonly fb: FormBuilder) {}
        initForm(): FormGroup {
          return this.fb.group({matricula: ['', Validators.required],
            nombre: ['', Validators.required],
            correo: ['', [Validators.required, Validators.email]],
            edad: [0, [Validators.required, Validators.min(0)]],
            horas: [0, [Validators.required, Validators.min(0)]]});
        }

        ngOnInit(): void {
          this.formGroup3 = this.initForm();
        }

//formulario 
  matricula: string = '';
  nombre: string = '';
  correo: string = '';
  edad: number = 0;
  horas: number = 0;

  registrarEmpleado() {
    const nuevoEmpleado: Trabajador = {
      matricula: this.formGroup3.get('matricula')?.value,
      nombre: this.formGroup3.get('nombre')?.value,
      correo: this.formGroup3.get('correo')?.value,
      edad: this.formGroup3.get('edad')?.value,
      horas: this.formGroup3.get('horas')?.value
    };
    this.empleados.push(nuevoEmpleado);
    localStorage.setItem('empleados', JSON.stringify(this.empleados));
    this.formGroup3.reset();  
  }


  calcularPagoHorasRegulares(horas: number): number {
    return horas > 40 ? 40 * 70 : horas * 70;
  }

  calcularPagoHorasExtras(horas: number): number {
    return horas > 40 ? (horas - 40) * 140 : 0;
  }

  calcularSubtotal(horas: number): number {
    return this.calcularPagoHorasRegulares(horas) + this.calcularPagoHorasExtras(horas);
  }
  imprimirTabla() {
    const empleadosGuardados = localStorage.getItem('empleados');
    if (empleadosGuardados) {
      this.empleados = JSON.parse(empleadosGuardados);
    }
  }

  eliminarEmpleado() {
    const matricula = this.formGroup3.get('matricula')?.value;
    this.empleados = this.empleados.filter(emp => emp.matricula !== matricula);
    localStorage.setItem('empleados', JSON.stringify(this.empleados));
  }

  modificarEmpleado() {
    const matricula = this.formGroup3.get('matricula')?.value;
    const empleado = this.empleados.find(emp => emp.matricula === matricula);
    if (empleado) {
      empleado.nombre = this.formGroup3.get('nombre')?.value;
      empleado.correo = this.formGroup3.get('correo')?.value;
      empleado.edad = this.formGroup3.get('edad')?.value;
      empleado.horas = this.formGroup3.get('horas')?.value;
      localStorage.setItem('empleados', JSON.stringify(this.empleados));
    }
  }

  calcularTotalAPagar(): number {
    return this.empleados.reduce((total, empleado) => {
      return total + this.calcularSubtotal(empleado.horas);
    }, 0);
  }

}