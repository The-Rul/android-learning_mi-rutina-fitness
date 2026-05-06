import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RutinaService } from '../services/rutina.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page {
  nombre = '';
  repeticiones: number | null = null;
  mensaje = '';

  constructor(
    private rutinaService: RutinaService,
    private router: Router
  ) {}

  async addEjercicio(): Promise<void> {
    const nombreLimpio = this.nombre.trim();

    if (!nombreLimpio || !this.repeticiones || this.repeticiones <= 0) {
      this.mensaje = 'Introduce un nombre y un número de repeticiones válido.';
      console.warn('Formulario de ejercicio no válido');
      return;
    }

    await this.rutinaService.addEjercicio(
      nombreLimpio,
      this.repeticiones
    );

    this.nombre = '';
    this.repeticiones = null;
    this.mensaje = 'Ejercicio añadido correctamente.';

    console.log('Formulario reiniciado tras añadir ejercicio');

    await this.router.navigate(['/tabs/rutinas']);
  }
}