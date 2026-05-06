import { Component, OnInit } from '@angular/core';
import { ConfiguracionUsuario, RutinaService } from '../services/rutina.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false,
})
export class Tab3Page implements OnInit {
  nombreUsuario = '';
  temaOscuro = false;
  mensaje = '';

  constructor(private rutinaService: RutinaService) {}

  async ngOnInit(): Promise<void> {
    const configuracion = await this.rutinaService.cargarConfiguracion();

    this.nombreUsuario = configuracion.nombreUsuario;
    this.temaOscuro = configuracion.temaOscuro;
  }

  async guardarConfiguracion(): Promise<void> {
    const configuracion: ConfiguracionUsuario = {
      nombreUsuario: this.nombreUsuario.trim(),
      temaOscuro: this.temaOscuro,
    };

    await this.rutinaService.guardarConfiguracion(configuracion);

    this.mensaje = 'Configuración guardada correctamente.';

    console.log('Configuración aplicada desde Tab3:', configuracion);
  }

  async cambiarTema(event: CustomEvent): Promise<void> {
    this.temaOscuro = event.detail.checked;

    await this.guardarConfiguracion();
  }
}