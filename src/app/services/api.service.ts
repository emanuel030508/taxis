import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Chofer {
  id: number;
  codigo_chofer: string;
  cedula_identidad: string;
  nombre: string;
  apellido: string;
  telefono?: string;
  vencimiento_libreta: string;
  fecha_ingreso: string;
  fecha_egreso?: string;
  estado: string;
  nombre_completo: string;
}

export interface ChoferCreate {
  codigo_chofer: string;
  cedula_identidad: string;
  nombre: string;
  apellido: string;
  telefono?: string;
  vencimiento_libreta: string;
  fecha_ingreso: string;
  estado?: string;
}

export interface Coche {
  id: number;
  matricula: string;
  movil: string;
  marca?: string;
  modelo?: string;
  anio?: string;
  kilometros: number;
  estado: string;
  matricula_completa: string;
}

export interface CocheCreate {
  matricula: string;
  movil: string;
  marca?: string;
  modelo?: string;
  anio?: string;
  kilometros?: number;
  estado?: string;
}

export interface Recaudacion {
  id: number;
  turno: string;
  fecha_turno: string;
  fecha_recibida: string;
  km_entrada: number;
  km_salida: number;
  km_totales: number;
  rendimiento: number;
  total_recaudado: number;
  salario: number;
  combustible: number;
  otros_gastos: number;
  total_gastos: number;
  liquido: number;
  aportes: number;
  sub_total: number;
  h13: number;
  credito: number;
  total_entregar: number;
  chofer_id?: number;
  coche_id?: number;
  chofer?: Chofer;
  coche?: Coche;
}

export interface RecaudacionCreate {
  chofer_id: number;
  coche_id: number;
  turno: string;
  fecha_turno: string;
  km_entrada: number;
  km_salida: number;
  total_recaudado: number;
  combustible: number;
  otros_gastos: number;
  h13: number;
  credito: number;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly API_URL = 'http://localhost:8000';

  constructor(private http: HttpClient) {}

  // ============ CHOFERES ============
  getChoferes(): Observable<Chofer[]> {
    return this.http.get<Chofer[]>(`${this.API_URL}/choferes/`).pipe(catchError(this.handleError));
  }

  getChofer(id: number): Observable<Chofer> {
    return this.http
      .get<Chofer>(`${this.API_URL}/choferes/${id}`)
      .pipe(catchError(this.handleError));
  }

  createChofer(chofer: ChoferCreate): Observable<Chofer> {
    return this.http
      .post<Chofer>(`${this.API_URL}/choferes/`, chofer)
      .pipe(catchError(this.handleError));
  }

  updateChofer(id: number, chofer: Partial<ChoferCreate>): Observable<Chofer> {
    return this.http
      .patch<Chofer>(`${this.API_URL}/choferes/${id}`, chofer)
      .pipe(catchError(this.handleError));
  }

  deleteChofer(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.API_URL}/choferes/${id}`)
      .pipe(catchError(this.handleError));
  }

  // ============ COCHES ============
  getCoches(): Observable<Coche[]> {
    return this.http.get<Coche[]>(`${this.API_URL}/coches/`).pipe(catchError(this.handleError));
  }

  getCoche(id: number): Observable<Coche> {
    return this.http.get<Coche>(`${this.API_URL}/coches/${id}`).pipe(catchError(this.handleError));
  }

  createCoche(coche: CocheCreate): Observable<Coche> {
    return this.http
      .post<Coche>(`${this.API_URL}/coches/`, coche)
      .pipe(catchError(this.handleError));
  }

  updateCoche(id: number, coche: Partial<CocheCreate>): Observable<Coche> {
    return this.http
      .patch<Coche>(`${this.API_URL}/coches/${id}`, coche)
      .pipe(catchError(this.handleError));
  }

  deleteCoche(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.API_URL}/coches/${id}`)
      .pipe(catchError(this.handleError));
  }

  // ============ RECAUDACIONES ============
  getRecaudaciones(): Observable<Recaudacion[]> {
    return this.http
      .get<Recaudacion[]>(`${this.API_URL}/recaudaciones/`)
      .pipe(catchError(this.handleError));
  }

  getRecaudacion(id: number): Observable<Recaudacion> {
    return this.http
      .get<Recaudacion>(`${this.API_URL}/recaudaciones/${id}`)
      .pipe(catchError(this.handleError));
  }

  createRecaudacion(recaudacion: RecaudacionCreate): Observable<Recaudacion> {
    return this.http
      .post<Recaudacion>(`${this.API_URL}/recaudaciones/`, recaudacion)
      .pipe(catchError(this.handleError));
  }

  updateRecaudacion(id: number, recaudacion: Partial<RecaudacionCreate>): Observable<Recaudacion> {
    return this.http
      .patch<Recaudacion>(`${this.API_URL}/recaudaciones/${id}`, recaudacion)
      .pipe(catchError(this.handleError));
  }

  deleteRecaudacion(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.API_URL}/recaudaciones/${id}`)
      .pipe(catchError(this.handleError));
  }

  // ============ ERROR HANDLING ============
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Ha ocurrido un error desconocido';

    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      if (error.status === 0) {
        errorMessage =
          'No se puede conectar al servidor. ¿Está el backend corriendo en http://localhost:8000?';
      } else if (error.status === 404) {
        errorMessage = 'Recurso no encontrado';
      } else if (error.status === 422) {
        errorMessage = `Error de validación: ${JSON.stringify(error.error)}`;
      } else {
        errorMessage = `Error ${error.status}: ${error.error?.detail || error.message}`;
      }
    }

    console.error('API Error:', error);
    return throwError(() => new Error(errorMessage));
  }
}
