import { Component, OnInit } from '@angular/core';
import { Ejercicio } from '../models/ejercicio.model';  
import { RutinaService } from '../services/rutina.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page implements OnInit {
  ejercicios: Ejercicio[] = [];
  
  
  constructor(private rutinaService:RutinaService) {  }


  /**
   * Al inciar sesion se carga la lista ejercicios en dispositivo. 
   */
  async ngOnInit(): Promise<void> {
    this.rutinaService.ejercicios$.subscribe((ejercicios) => {
      this.ejercicios = ejercicios;
    });

    await this.rutinaService.cargarEjercicios();
  }

  /**
   *  Al entrar a la vista se recarga la lista actuaclizada
   */
  async ionViewWillEnter(): Promise<void> {
    await this.rutinaService.cargarEjercicios();
  }

  /**
   * Recoge el evento y lo cambia en el ejercicio. 
   */

  async cambiarEstado(event: CustomEvent, id: string): Promise<void> {
    const completado = event.detail.checked;
    await this.rutinaService.cambiarEstadoEjercicio(id, completado);
  }


}
