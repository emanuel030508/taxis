import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService, Chofer, ChoferCreate } from '../../services/api.service';

@Component({
  selector: 'app-choferes',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, ReactiveFormsModule],
  templateUrl: './choferes.html',
  styleUrl: './choferes.css',
})
export class ChoferesPage implements OnInit {
  private apiService = inject(ApiService);
  private fb = inject(FormBuilder);

  choferes: Chofer[] = [];
  loading = true;
  error: string | null = null;
  showModal = false;
  saving = false;
  editingChofer: Chofer | null = null;

  choferForm: FormGroup = this.fb.group({
    codigo_chofer: ['', [Validators.required, Validators.maxLength(5)]],
    cedula_identidad: ['', Validators.required],
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    telefono: [''],
    fecha_ingreso: ['', Validators.required],
    vencimiento_libreta: ['', Validators.required],
    estado: ['Activo', Validators.required],
  });

  ngOnInit(): void {
    this.loadChoferes();
  }

  loadChoferes(): void {
    this.loading = true;
    this.error = null;

    this.apiService.getChoferes().subscribe({
      next: (choferes) => {
        this.choferes = choferes;
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
      Inactivo: 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300',
      'Licencia Vacacional': 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
      'Licencia Médica': 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300',
      'Baja Temporal': 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300',
      'Baja Permanente': 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300',
    };
    return classes[estado] || classes['Inactivo'];
  }

  openModal(): void {
    this.editingChofer = null;
    this.choferForm.reset({ estado: 'Activo' });
    this.showModal = true;
  }

  editChofer(chofer: Chofer): void {
    this.editingChofer = chofer;
    this.choferForm.patchValue({
      codigo_chofer: chofer.codigo_chofer,
      cedula_identidad: chofer.cedula_identidad,
      nombre: chofer.nombre,
      apellido: chofer.apellido,
      telefono: chofer.telefono || '',
      fecha_ingreso: chofer.fecha_ingreso,
      vencimiento_libreta: chofer.vencimiento_libreta,
      estado: chofer.estado,
    });
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.editingChofer = null;
    this.choferForm.reset();
  }

  onSubmit(): void {
    if (this.choferForm.invalid) return;

    this.saving = true;
    const formData: ChoferCreate = this.choferForm.value;

    if (this.editingChofer) {
      this.apiService.updateChofer(this.editingChofer.id, formData).subscribe({
        next: () => {
          this.saving = false;
          this.closeModal();
          this.loadChoferes();
        },
        error: (err) => {
          this.saving = false;
          alert('Error al actualizar: ' + err.message);
        },
      });
    } else {
      this.apiService.createChofer(formData).subscribe({
        next: () => {
          this.saving = false;
          this.closeModal();
          this.loadChoferes();
        },
        error: (err) => {
          this.saving = false;
          alert('Error al crear: ' + err.message);
        },
      });
    }
  }

  deleteChofer(id: number): void {
    if (!confirm('¿Estás seguro de que deseas eliminar este chofer?')) return;

    this.apiService.deleteChofer(id).subscribe({
      next: () => {
        this.loadChoferes();
      },
      error: (err) => {
        alert('Error al eliminar: ' + err.message);
      },
    });
  }
}
