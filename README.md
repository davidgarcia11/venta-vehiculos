# Venta-Vehículos

![CI](https://github.com/davidgarcia11/venta-vehiculos/actions/workflows/ci.yml/badge.svg)

¡Bienvenido al proyecto de gestión de ventas de vehículos! Esta aplicación te permite gestionar de forma eficiente la compra y venta de vehículos, así como la información de tus clientes.

---

## Tabla de Contenidos

1.  [Características](#características)
2.  [Tecnologías](#tecnologías)
3.  [Estructura del Proyecto](#estructura-del-proyecto)
4.  [Instalación y Configuración](#instalación-y-configuración)
    * [Clonar Repositorio](#clonar-repositorio)
    * [Variables de Entorno](#variables-de-entorno)
    * [Instalar Dependencias](#instalar-dependencias)
5.  [Ejecución](#ejecución)
    * [Backend](#backend)
    * [Frontend](#frontend)
    * [Docker Compose (Full-Stack)](#docker-compose-full-stack)
6.  [Tests](#tests)
    * [Unitarios](#unitarios)
    * [Integración](#integración)
7.  [CI/CD](#cicd)
8.  [Docker](#docker)
9.  [Licencia](#licencia)
10. [Descargar](#descargar)

---

## Características

* **CRUD completo** para **Clientes** y **Vehículos**: Crea, lee, actualiza y elimina registros de forma sencilla.
* **Arquitectura en capas**: El proyecto está organizado en `controllers`, `services`, `models`, `routes` y `config` para una mejor modularidad y mantenimiento.
* **Base de datos flexible**: Utiliza **SQLite** para el desarrollo local y **MariaDB** en entornos de Integración Continua (CI).
* **Tests exhaustivos**:
    * **Unitarios** con [Jest](https://jestjs.io/) y [Supertest](https://github.com/visionmedia/supertest) para asegurar la funcionalidad de cada componente.
    * **Tests de integración** automatizados para verificar el comportamiento de la aplicación en su conjunto.
* **CI/CD con GitHub Actions**: Flujos de trabajo automatizados para ejecutar tests y construir imágenes Docker en cada push.
* **Orquestación local con Docker Compose**: Despliega y gestiona fácilmente tu entorno de desarrollo completo (Base de Datos + API + Frontend) con un solo comando.

---

## Descargar

Puedes descargar la última versión del proyecto directamente desde aquí:

[**Descargar Proyecto (ZIP)**](https://github.com/davidgarcia11/venta-vehiculos/archive/refs/heads/main.zip)

---

---

... (resto del README unchanged)

