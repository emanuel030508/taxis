import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';

interface Stats {
  choferes: number;
  coches: number;
  recaudaciones: number;
}

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
})
export class LandingPage implements OnInit {
  private apiService = inject(ApiService);

  stats: Stats = {
    choferes: 0,
    coches: 0,
    recaudaciones: 0,
  };

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats(): void {
    // Cargar choferes
    this.apiService.getChoferes().subscribe({
      next: (choferes) => {
        this.stats.choferes = choferes.length;
      },
      error: () => {
        this.stats.choferes = 0;
      },
    });

    // Cargar coches
    this.apiService.getCoches().subscribe({
      next: (coches) => {
        this.stats.coches = coches.length;
      },
      error: () => {
        this.stats.coches = 0;
      },
    });

    // Cargar recaudaciones
    this.apiService.getRecaudaciones().subscribe({
      next: (recaudaciones) => {
        this.stats.recaudaciones = recaudaciones.length;
      },
      error: () => {
        this.stats.recaudaciones = 0;
      },
    });
  }

  scrollToFeatures(): void {
    const element = document.getElementById('features');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
