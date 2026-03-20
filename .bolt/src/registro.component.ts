import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { SupabaseService, Membresia } from './supabase.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule
  ],
  template: `
    <div class="container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Registro de Membresía</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <form #registroForm="ngForm" (ngSubmit)="registrar()">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Nombres</mat-label>
              <input matInput [(ngModel)]="membresia.nombres" name="nombres" required>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Apellidos</mat-label>
              <input matInput [(ngModel)]="membresia.apellidos" name="apellidos" required>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Edad</mat-label>
              <input matInput type="number" [(ngModel)]="membresia.edad" name="edad" required>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Correo</mat-label>
              <input matInput type="email" [(ngModel)]="membresia.correo" name="correo" required>
            </mat-form-field>

            <button mat-raised-button color="primary" type="submit" [disabled]="!registroForm.form.valid || cargando">
              {{ cargando ? 'Registrando...' : 'Registrar Membresía' }}
            </button>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      padding: 20px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }

    mat-card {
      max-width: 500px;
      width: 100%;
      box-shadow: 0 8px 24px rgba(0,0,0,0.15);
    }

    mat-card-header {
      display: flex;
      justify-content: center;
      margin-bottom: 20px;
    }

    mat-card-title {
      font-size: 28px;
      font-weight: 600;
      color: #333;
    }

    .full-width {
      width: 100%;
      margin-bottom: 16px;
    }

    button {
      width: 100%;
      height: 48px;
      font-size: 16px;
      margin-top: 8px;
    }

    form {
      display: flex;
      flex-direction: column;
    }
  `]
})
export class RegistroComponent {
  membresia: Membresia = {
    nombres: '',
    apellidos: '',
    edad: 0,
    correo: '',
    estatus: 'activo'
  };

  cargando = false;

  constructor(
    private supabaseService: SupabaseService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  async registrar() {
    this.cargando = true;
    try {


        console.log('Registrando membresía:', this.membresia);
      localStorage.setItem('membresia', JSON.stringify(this.membresia));

      this.snackBar.open('Membresía registrada exitosamente', 'Cerrar', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
      this.router.navigate(['/listado']);
    } catch (error: any) {
      this.snackBar.open('Error al registrar: ' + error.message, 'Cerrar', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    } finally {
      this.cargando = false;
    }
  }
}
