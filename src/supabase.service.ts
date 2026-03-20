import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Observable } from 'rxjs';

export interface Membresia {
  id?: string;
  nombres: string;
  apellidos: string;
  edad: number;
  correo: string;
  estatus: string;
  created_at?: string;
}

export interface MembresiaResponse {
 id: number,
 nombre : string,
 idUsuario : number,
  idEstatus: number,
  estatus: boolean
}


@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor(
     private readonly http: HttpClient
  ) {
    this.supabase = createClient(
      'https://ikwzfjizegmlznphmhyo.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlrd3pmaml6ZWdtbHpucGhtaHlvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM5NTUxODAsImV4cCI6MjA4OTUzMTE4MH0.zCuJEIt6j3m8WBpKwvLSpW1BrxkE3QT1NcWszvS-1t0'
    );
  }

  GetList(): Observable<MembresiaResponse[]> {
    return this.http.get<MembresiaResponse[]>(`https://api.mockfly.dev/mocks/3fe66492-5b20-40a4-a3b0-0d2efa59070a/listado`);
  }
  




}
