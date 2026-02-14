import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService, Coche, CocheCreate } from '../../services/api.service';

@Component({
  selector: 'app-coches',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, ReactiveFormsModule],
  templateUrl: './coches.html',
  styleUrl: './coches.css',
})
export class CochesPage implements OnInit {
  private apiService = inject(ApiService);
  private fb = inject(FormBuilder);

  coches: Coche[] = [];
  loading = true;
  error: string | null = null;
  showModal = false;
  saving = false;
  editingCoche: Coche | null = null;

  cocheForm: FormGroup = this.fb.group({
    matricula: ['', [Validators.required, Validators.maxLength(4)]],
    movil: ['', [Validators.required, Validators.maxLength(4)]],
    marca: [''],
    modelo: [''],
    anio: [''],
    kilometros: [0],
    estado: ['Activo', Validators.required],
  });

  ngOnInit(): void {
    this.loadCoches();
  }

  loadCoches(): void {
    this.loading = true;
    this.error = null;

    this.apiService.getCoches().subscribe({
      next: (coches) => {
        this.coches = coches;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message;
        this.loading = false;
      },
    });
  }

  getEstadoClass(estado: string): string {
    const classes: { [key: string]: string } = {
      Activo: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
      Disponible: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
      Inactivo: 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300',
      Mantenimiento: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300',
    };
    return classes[estado] || classes['Inactivo'];
  }

  openModal(): void {
    this.editingCoche = null;
    this.cocheForm.reset({ estado: 'Activo', kilometros: 0 });
    this.showModal = true;
  }

  editCoche(coche: Coche): void {
    this.editingCoche = coche;
    this.cocheForm.patchValue({
      matricula: coche.matricula,
      movil: coche.movil,
      marca: coche.marca || '',
      modelo: coche.modelo || '',
      anio: coche.anio || '',
      kilometros: coche.kilometros,
      estado: coche.estado,
    });
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.editingCoche = null;
    this.cocheForm.reset();
  }

  onSubmit(): void {
    if (this.cocheForm.invalid) return;

    this.saving = true;
    const formData: CocheCreate = this.cocheForm.value;

    if (this.editingCoche) {
      this.apiService.updateCoche(this.editingCoche.id, formData).subscribe({
        next: () => {
          this.saving = false;
          this.closeModal();
          this.loadCoches();
        },
        error: (err) => {
          this.saving = false;
          alert('Error al actualizar: ' + err.message);
        },
      });
    } else {
      this.apiService.createCoche(formData).subscribe({
        next: () => {
          this.saving = false;
          this.closeModal();
          this.loadCoches();
        },
        error: (err) => {
          this.saving = false;
          alert('Error al crear: ' + err.message);
        },
      });
    }
  }

  deleteCoche(id: number): void {
    if (!confirm('¿Estás seguro de que deseas eliminar este coche?')) return;

    this.apiService.deleteCoche(id).subscribe({
      next: () => {
        this.loadCoches();
      },
      error: (err) => {
        alert('Error al eliminar: ' + err.message);
      },
    });
  }
}
