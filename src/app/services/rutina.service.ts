import { Injectable } from "@angular/core"
import { Preferences } from "@capacitor/preferences"
import { BehaviorSubject } from "rxjs"

import {Ejercicio} from "../models/ejercicio.model"

export interface ConfiguracionUsuario{
    nombreUsuario:string;
    temaOscuro:boolean;
}

//Decorador @Injectable para indicar que esta clase es un servicio que se puede inyectar en otros componentes o servicios
@Injectable({
    providedIn: 'root' //El servicio estará disponible en toda la aplicacion
})
export class RutinaService{
    private readonly EJERCICIOS_KEY = 'ejercicios';
    private readonly CONFIG_KEY = 'configuracionUsuario';

    private ejerciciosSubject = new BehaviorSubject<Ejercicio[]>([]); //Lista interna que servicio puede modificar. almacena dosnde se guarda la lista de ejercicios
    ejercicios$ = this.ejerciciosSubject.asObservable(); //Version publica de la lista que las paginas pueden leer

    constructor(){

    }

    /**
     * Carga los ejercicios almacenados en el dispositivo. 
     */
    async cargarEjercicios(): Promise<void>{
        try{
            const {value} = await Preferences.get({key: this.EJERCICIOS_KEY});
            console.log('Datos crudos de prefrences: ', value);

            const ejercicios: Ejercicio[] = value ?JSON.parse(value) :[]; // Parseo a JSON
            this.ejerciciosSubject.next(ejercicios);

            console.log('Ejercicios cargados: ', ejercicios); 


        }catch(error){
            console.error('Error al cargar ejercicios:', error);
            this.ejerciciosSubject.next([]); // Si hay un error, se establece lista vacía para evitar problemas. 
        }
    } 
    
    /**
     * Guarda la lista actual de ejercicios en el almacenamiento
     */
    async guardarEjercicios(ejercicios: Ejercicio[]): Promise<void>{
        try{
            await Preferences.set({
                key: this.EJERCICIOS_KEY,
                value: JSON.stringify(ejercicios)
            });
            this.ejerciciosSubject.next(ejercicios); // Actualiza la lista interna con los nuevos ejercicios.
            console.log('Ejercicios guardados: ', ejercicios);
        }catch(error){
            console.error('Error al guardar ejercicios:', error);
        }
    } 

    async addEjercicio(nombre:string, repeticiones:number): Promise<void>{
        const ejerciciosActuales = this.ejerciciosSubject.value;
        
        const nuevoEjercicio: Ejercicio = { //Se creaa un ejercicio nuevo con los datos pasados por parametro.
            id: crypto.randomUUID(),
            nombre,
            repeticiones,
            completado: false,
        };

        const ejerciciosActualizados = [...ejerciciosActuales,nuevoEjercicio]; // nueva lista con el nuevo ejercicio incluido. 
        
        await this.guardarEjercicios(ejerciciosActualizados); // Se guarda la nueva lista de ejercicios con el nuevo ejercicio incluido.

        console.log('Nuevo ejercicio añadido: ', nuevoEjercicio);

    }

    /**
     * Modifica el estado de completado de un ejercicio buscado por id
     */

    async cambiarEstadoEjercicio(id:string, completado:boolean): Promise<void>{
        const ejerciciosActualizados = this.ejerciciosSubject.value.map((ejercicio) => 
            ejercicio.id === id            // Si el id coincide, se crea nuevo objeto con el mismo contenido pero con estado completado
        ?{...ejercicio,completado} 
        :ejercicio
        ); 
        
        await this.guardarEjercicios(ejerciciosActualizados);

        console.log('Ejercicio ${id} actualizado. Completado: ', completado);
    }
    

    async cargarConfiguracion(): Promise<ConfiguracionUsuario> {
    try {
      const { value } = await Preferences.get({ key: this.CONFIG_KEY });

      const configuracion: ConfiguracionUsuario = value
        ? JSON.parse(value)
        : {
            nombreUsuario: '',
            temaOscuro: false,
          };

      this.aplicarTema(configuracion.temaOscuro);

      console.log('Configuración cargada:', configuracion);

      return configuracion;
    } catch (error) {
      console.error('Error al cargar configuración:', error);

      return {
        nombreUsuario: '',
        temaOscuro: false,
      };
    }
  }

  async guardarConfiguracion(configuracion: ConfiguracionUsuario): Promise<void> {
    try {
      await Preferences.set({
        key: this.CONFIG_KEY,
        value: JSON.stringify(configuracion),
      });

      this.aplicarTema(configuracion.temaOscuro);

      console.log('Configuración guardada:', configuracion);
    } catch (error) {
      console.error('Error al guardar configuración:', error);
    }
  }

  aplicarTema(temaOscuro: boolean): void {
    document.body.classList.toggle('dark', temaOscuro);
  }
}