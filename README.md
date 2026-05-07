# 💪 Mi Rutina Fitness

![Ionic](https://img.shields.io/badge/Ionic-3880FF?logo=ionic&logoColor=white)
![Angular](https://img.shields.io/badge/Angular-DD0031?logo=angular&logoColor=white)
![Capacitor](https://img.shields.io/badge/Capacitor-119EFF?logo=capacitor&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![SCSS](https://img.shields.io/badge/SCSS-CC6699?logo=sass&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?logo=git&logoColor=white)

---

## 📋 Descripción

**Mi Rutina Fitness** es una aplicación híbrida desarrollada con **Ionic y Angular** orientada a la gestión básica de rutinas de ejercicios.

El proyecto se ha realizado en el contexto académico del módulo de **Programación Multimedia y Dispositivos Móviles**, como práctica de introducción al desarrollo de aplicaciones híbridas. La aplicación permite trabajar conceptos fundamentales como la navegación mediante pestañas, el uso de componentes Ionic, la gestión de formularios, la lógica en TypeScript y la persistencia local de datos mediante Capacitor.

La finalidad principal de la aplicación es permitir que el usuario pueda registrar ejercicios, consultar su rutina, marcar ejercicios como completados y guardar algunas preferencias básicas de configuración.

---

## 🎯 Objetivos del proyecto

- Comprender la estructura básica de un proyecto Ionic con Angular.
- Configurar una aplicación mediante navegación por pestañas.
- Utilizar componentes visuales de Ionic para construir interfaces móviles.
- Gestionar datos desde TypeScript.
- Implementar persistencia local mediante `@capacitor/preferences`.
- Aplicar estilos personalizados mediante SCSS.
- Practicar el uso de Git como sistema de control de versiones.

---

## 🛠️ Tecnologías utilizadas

- **Ionic**
- **Angular**
- **TypeScript**
- **Capacitor**
- **Capacitor Preferences**
- **HTML**
- **SCSS**
- **Git**

---

## ✨ Funcionalidades principales

### 🏋️ Pestaña Rutinas

Permite visualizar la lista de ejercicios registrados por el usuario.

Acciones disponibles:

- ✅ Marcar o desmarcar un ejercicio como realizado.
- 🗑️ Eliminar un ejercicio individual.
- ❌ Eliminar todos los ejercicios registrados.

#### 📸 Captura de pantalla

![Mis ejercicios](./docs/screenshots/misEjercicios_2026-05-07_195539.png)

---

### ➕ Pestaña Añadir Ejercicio

Incluye un formulario para añadir nuevos ejercicios a la rutina: nombre, repeticiones y una imagen opcional (en desarrollo).

Una vez añadido un ejercicio, este se almacena y se muestra en la pestaña de rutinas.

#### 📸 Captura de pantalla

![Añadir ejercicio](./docs/screenshots/addEjercicio_2026-05-07_195607.png)

---

### ⚙️ Pestaña Configuración

Permite gestionar preferencias básicas de usuario:

- 👤 Guardar el nombre del usuario.
- 🌙 Activar o desactivar el tema oscuro.

Estos datos se almacenan de forma persistente.

#### 📸 Captura de pantalla

![Configuración](./docs/screenshots/configuracion_2026-05-07_195615.png)

---

## 💾 Persistencia de datos

La aplicación utiliza el plugin:

```bash
@capacitor/preferences