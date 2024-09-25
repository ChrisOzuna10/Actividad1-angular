import { Component } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-student-dialog',
  template: `
    <h1 mat-dialog-title>Apellidos Disponibles</h1>
    <div mat-dialog-content>
      <ul>
        <li *ngFor="let apellido of data.student">{{ apellido }}</li>
      </ul>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="closeDialog()">Cerrar</button>
    </div>
  `,
  imports: [CommonModule],
})
export class StudentDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { student: string[] },
    private dialogRef: MatDialogRef<StudentDialogComponent>
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
