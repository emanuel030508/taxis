import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import {
  ApiService,
  Recaudacion,
  RecaudacionCreate,
  Chofer,
  Coche,
} from '../../services/api.service';

@Component({
  selector: 'app-recaudaciones',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, ReactiveFormsModule],
  templateUrl: './recaudaciones.html',
  styleUrl: './recaudaciones.css',
})
export class RecaudacionesPage implements OnInit {
  private apiService = inject(ApiService);
  private fb = inject(FormBuilder);

  recaudaciones: Recaudacion[] = [];
  choferes: Chofer[] = [];
  coches: Coche[] = [];
  loading = true;
  error: string | null = null;
  showModal = false;
  saving = false;
  editingRecaudacion: Recaudacion | null = null;

  recaudacionForm: FormGroup = this.fb.group({
    chofer_id: ['', Validators.required],
    coche_id: ['', Validators.required],
    fecha_turno: ['', Validators.required],
    turno: ['Mañana', Validators.required],
    km_entrada: [0, Validators.required],
    km_salida: [0, Validators.required],
    total_recaudado: [0, Validators.required],
    combustible: [0],
    otros_gastos: [0],
    h13: [0],
    credito: [0],
  });

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading = true;
    this.error = null;

    // Load all data in parallel
    Promise.all([this.loadRecaudaciones(), this.loadChoferes(), this.loadCoches()])
      .then(() => {
        this.loading = false;
      })
      .catch((err) => {
        this.error = err.message;
        this.loading = false;
      });
  }

  private loadRecaudaciones(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.apiService.getRecaudaciones().subscribe({
        next: (recaudaciones) => {
          this.recaudaciones = recaudaciones;
          resolve();
        },
        error: (err) => reject(err),
      });
    });
  }

  private loadChoferes(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.apiService.getChoferes().subscribe({
        next: (choferes) => {
          this.choferes = choferes;
          resolve();
        },
        error: (err) => reject(err),
      });
    });
  }

  private loadCoches(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.apiService.getCoches().subscribe({
        next: (coches) => {
          this.coches = coches;
          resolve();
        },
        error: (err) => reject(err),
      });
    });
  }

  getTurnoClass(turno: string): string {
    const classes: { [key: string]: string } = {
      Mañana: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300',
      Noche: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300',
      Solo: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
    };
    return classes[turno] || 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300';
  }

  openModal(): void {
    this.editingRecaudacion = null;
    this.recaudacionForm.reset({
      turno: 'Mañana',
      km_entrada: 0,
      km_salida: 0,
      total_recaudado: 0,
      combustible: 0,
      otros_gastos: 0,
      h13: 0,
      credito: 0,
    });
    this.showModal = true;
  }

  editRecaudacion(recaudacion: Recaudacion): void {
    this.editingRecaudacion = recaudacion;
    this.recaudacionForm.patchValue({
      chofer_id: recaudacion.chofer_id,
      coche_id: recaudacion.coche_id,
      fecha_turno: recaudacion.fecha_turno,
      turno: recaudacion.turno,
      km_entrada: recaudacion.km_entrada,
      km_salida: recaudacion.km_salida,
      total_recaudado: recaudacion.total_recaudado,
      combustible: recaudacion.combustible,
      otros_gastos: recaudacion.otros_gastos,
      h13: recaudacion.h13,
      credito: recaudacion.credito,
    });
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.editingRecaudacion = null;
    this.recaudacionForm.reset();
  }

  onSubmit(): void {
    if (this.recaudacionForm.invalid) return;

    this.saving = true;
    const formData: RecaudacionCreate = {
      ...this.recaudacionForm.value,
      chofer_id: parseInt(this.recaudacionForm.value.chofer_id),
      coche_id: parseInt(this.recaudacionForm.value.coche_id),
    };

    if (this.editingRecaudacion) {
      this.apiService.updateRecaudacion(this.editingRecaudacion.id, formData).subscribe({
        next: () => {
          this.saving = false;
          this.closeModal();
          this.loadData();
        },
        error: (err) => {
          this.saving = false;
          alert('Error al actualizar: ' + err.message);
        },
      });
    } else {
      this.apiService.createRecaudacion(formData).subscribe({
        next: () => {
          this.saving = false;
          this.closeModal();
          this.loadData();
        },
        error: (err) => {
          this.saving = false;
          alert('Error al crear: ' + err.message);
        },
      });
    }
  }

  deleteRecaudacion(id: number): void {
    if (!confirm('¿Estás seguro de que deseas eliminar esta recaudación?')) return;

    this.apiService.deleteRecaudacion(id).subscribe({
      next: () => {
        this.loadData();
      },
      error: (err) => {
        alert('Error al eliminar: ' + err.message);
      },
    });
  }
}
