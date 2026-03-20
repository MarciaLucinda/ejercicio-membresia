import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { SupabaseService, Membresia, MembresiaResponse } from './supabase.service';

@Component({
  selector: 'app-listado',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule
  ],
  template: `
    <div class="container">
      <div class="header">
        <h1>Gestión de Membresías</h1>
       
      </div>

      <mat-card class="table-card">
        <mat-card-header>
          <mat-card-title>Datos del Usuario</mat-card-title>
        </mat-card-header>
        <mat-card-content>
           <p><strong>Nombres :</strong>{{datosUsuario?.nombres}} </p>
          <p><strong>Apellidos :</strong> {{datosUsuario?.apellidos}} </p>
          <p><strong>Edad :</strong> {{datosUsuario?.edad}} </p>
          <p><strong>Correo :</strong> {{datosUsuario?.correo}} </p>
        </mat-card-content>
      </mat-card>

      <mat-card class="table-card">
        <mat-card-header>
          <mat-card-title>Membresías Activas</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <table mat-table [dataSource]="membresiasActivas()" class="mat-elevation-z2">
            <ng-container matColumnDef="mes">
              <th mat-header-cell *matHeaderCellDef>Mes</th>
              <td mat-cell *matCellDef="let membresia">{{membresia.nombre}}</td>
            </ng-container>

            <ng-container matColumnDef="cuenta">
              <th mat-header-cell *matHeaderCellDef>Cuenta</th>
              <td mat-cell *matCellDef="let membresia">{{membresia.cuenta}}</td>
            </ng-container>



       

            <tr mat-header-row *matHeaderRowDef="columnasTabla"></tr>
            <tr mat-row *matRowDef="let row; columns: columnasTabla;"></tr>
          </table>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .container {
      padding: 24px;
      background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
      min-height: 100vh;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
      padding: 0 8px;
    }

    h1 {
      font-size: 32px;
      font-weight: 600;
      color: #333;
      margin: 0;
    }

    .table-card {
      margin-bottom: 24px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }

    mat-card-title {
      font-size: 20px;
      font-weight: 600;
      color: #555;
    }

    table {
      width: 100%;
    }

    th {
      background-color: #f5f5f5;
      font-weight: 600;
      color: #333;
    }

    td, th {
      padding: 12px;
    }

    mat-chip {
      font-weight: 500;
    }

    .chip-activo {
      background-color: #4caf50;
      color: white;
    }

    .chip-inactivo {
      background-color: #f44336;
      color: white;
    }

    @media (max-width: 768px) {
      .header {
        flex-direction: column;
        align-items: flex-start;
        gap: 16px;
      }

      h1 {
        font-size: 24px;
      }
    }
  `]
})
export class ListadoComponent implements OnInit {
  todasMembresias: Membresia[] = [];
  columnasTabla: string[] = ['mes', 'cuenta'];
membresiasActivas = signal<MembresiaResponse[]>([]);
datosUsuario: Membresia | null = null;

  constructor(
    private supabaseService: SupabaseService,
    private router: Router
  ) {}

  async ngOnInit() {
    //await this.cargarDatos();
8
     this.supabaseService.GetList().subscribe((data : any) => {
    this.membresiasActivas.set(data);
  });
  await this.getHeader();
  }

  async getHeader(){
        const data = localStorage.getItem('membresia');
    console.log('Datos obtenidos del localStorage:', data);

    const usuario = JSON.parse(localStorage.getItem('membresia') || '{}');
console.log(usuario);
this.datosUsuario = usuario;
  }

  async cargarDatos() {
    try {
    
      this.supabaseService.GetList().subscribe(data => {
     
        console.log('Datos obtenidos de la API:', data);
        this.membresiasActivas.set(data);
      });
    } catch (error) {
      console.error('Error al cargar membresías:', error);
    }
  }

  volverRegistro() {
    this.router.navigate(['/']);
  }
}
