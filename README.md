\# Venta-Vehículos



![CI]\([https://github.com/davidgarcia11/venta-vehiculos/actions/workflows/ci.yml/badge.svg](https://github.com/davidgarcia11/venta-vehiculos/actions/workflows/ci.yml/badge.svg))



Proyecto de gestión de ventas de vehículos…

## Tabla de contenidos

1. [Características](#caracter%C3%ADsticas)
2. [Tecnologías](#tecnolog%C3%ADas)
3. [Estructura del proyecto](#estructura-del-proyecto)
4. [Instalación y configuración](#instalaci%C3%B3n-y-configuraci%C3%B3n)
   - [Clonar repositorio](#clonar-repositorio)
   - [Variables de entorno](#variables-de-entorno)
   - [Instalar dependencias](#instalar-dependencias)
5. [Ejecución](#ejecuci%C3%B3n)
   - [Backend](#backend)
   - [Frontend](#frontend)
   - [Docker Compose (full-stack)](#docker-compose-full-stack)
6. [Tests](#tests)
   - [Unitarios](#unitarios)
   - [Integración](#integraci%C3%B3n)
7. [CI/CD](#cicd)
8. [Docker](#docker)
9. [Licencia](#licencia)

---

## Características

- CRUD completo de **Clientes** y **Vehículos**.
- Arquitectura en capas: `controllers`, `services`, `models`, `routes`, `config`.
- Base de datos SQLite para desarrollo y MariaDB en CI.
- Tests unitarios con Jest y Supertest.
- Tests de integración automatizados.
- CI con GitHub Actions (tests + build de Docker).
- Orquestación local con Docker Compose (DB + API + Front).

---

... (resto del README unchanged)

