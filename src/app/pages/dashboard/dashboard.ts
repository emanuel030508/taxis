import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ApiService } from '../../services/api.service';

interface Stats {
  choferes: number;
  coches: number;
  recaudaciones: number;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class DashboardPage implements OnInit {
  private apiService = inject(ApiService);

  stats: Stats = {
    choferes: 0,
    coches: 0,
    recaudaciones: 0,
  };

  currentDate: string = '';

  ngOnInit(): void {
    this.currentDate = new Date().toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    this.loadStats();
  }

  loadStats(): void {
    this.apiService.getChoferes().subscribe({
      next: (choferes) => {
        this.stats.choferes = choferes.length;
      },
      error: () => {
        this.stats.choferes = 0;
      },
    });

    this.apiService.getCoches().subscribe({
      next: (coches) => {
        this.stats.coches = coches.length;
      },
      error: () => {
        this.stats.coches = 0;
      },
    });

    this.apiService.getRecaudaciones().subscribe({
      next: (recaudaciones) => {
        this.stats.recaudaciones = recaudaciones.length;
      },
      error: () => {
        this.stats.recaudaciones = 0;
      },
    });
  }
}
