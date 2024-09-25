import { Component, inject } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatDialog,MatDialogModule } from '@angular/material/dialog';

import { Student } from '../../models/student';
import { StudentDialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  standalone: true,
  imports: [
    AsyncPipe,
    MatGridListModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    CommonModule,
    MatDialogModule,
    StudentDialogComponent,
    
  ]
})
export class DashboardComponent {
  studentForm = new FormGroup({
    name: new FormControl('', { nonNullable: true}),
    apellido: new FormControl('',{nonNullable: true})
  });

  apellidosArray: string[] = [];
  studentsArray: Student[] = [];
  private contador: number = 1;

  addApellido() {
    const apellido = this.studentForm.get('apellido')?.value;
    if (apellido && !this.apellidosArray.includes(apellido)) {
      this.apellidosArray.push(apellido);
      this.studentForm.get('apellido')?.reset(); 
    }
  }

  createStudent() {
    const name = this.studentForm.get('name')?.value || '';
    const apellidos = [...this.apellidosArray]; 

    if (name && apellidos.length > 0) {
      const student: Student = {
        id: this.contador++,
        name,
        apellidos
      };
      this.studentsArray.push(student);
      this.apellidosArray = []; 
      this.studentForm.reset();
    }
  }

  constructor(private dialog: MatDialog) {}

  openDialog(apellidos: string[]) { 
    this.dialog.open(StudentDialogComponent, {
      data: { student: apellidos },
    });
  }

  deleteStudent(id: number) {
    this.studentsArray = this.studentsArray.filter(student => student.id !== id);
  }

}
