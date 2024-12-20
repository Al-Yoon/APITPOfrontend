# EasyPays - Frontend

EasyPays es una aplicación web para gestionar y dividir gastos de manera sencilla y eficiente. Esta guía te ayudará a configurar y ejecutar el proyecto tanto para el backend como para el frontend.

Colaboradores: Alex Yoon, Santiago Boher y Federico Prieto.

## Prerrequisitos

- Node.js (v14 o superior)
- npm (v6 o superior)
- MySQL (v5.7 o superior)

## Clonar el Repositorio

Primero, clona el repositorio desde GitHub:
(BACKEND)
https://github.com/Al-Yoon/APITPObackend.git- CAMBIAR RUTA

(FRONTEND)
https://github.com/Al-Yoon/APITPOfrontend.git- CAMBIAR RUTA

git clone

## Configuración del Frontend

### 1. Navegar a la Carpeta del Frontend

Abre una nueva terminal y navega a la carpeta del frontend:


sh cd ../frontend

### 2. Instalar Dependencias


sh npm install

### 3. Iniciar el Servidor de Desarrollo del Frontend


sh npm start

Esto iniciará el servidor de desarrollo del frontend en `http://localhost:3000`.

## Configuración del Backend

### 1. Navegar a la Carpeta del Backend


sh cd backend

### 2. Instalar Dependencias


sh npm install

### 3. Configurar Variables de Entorno

Crea un archivo `.env` en la carpeta `backend` con las siguientes variables de entorno. Asegúrate de cambiar las configuraciones según tu servidor MySQL y tus claves API:


env

DB
PORT=3306 DB_NAME=easypays DB_USERNAME=root DB_PASSWORD=your_mysql_password

Resend
RESEND_API_KEY=your_resend_api_key

Cloudinary
CLOUD_NAME=your_cloud_name CLOUDINARY_API_KEY=your_cloudinary_api_key CLOUDINARY_SECRET=your_cloudinary_secret

Auth
SALT=some_random_salt_value_for_bcrypt

Jwt
PRIVATE_KEY=your_private_key

### 4. Crear la Base de Datos

Asegúrate de que tienes una base de datos MySQL corriendo y crea una base de datos llamada `easypays` (o el nombre que hayas especificado en tu archivo `.env`):


sql CREATE DATABASE easypays;

### 5. Iniciar el Servidor del Backend


sh npm start

Esto iniciará el servidor del backend en el puerto 8080 (o el puerto especificado en tu archivo `.env`).

Luego de que se inicie el backend y se creen las tablas, abrir el archivo queriesPruebas e ir creando en MySQL algunas tablas dentro del servidor.

Ahora con eso se pueden probar los endpoints en postman o bien acceder a la documentación. Los links son los siguientes:

Documentación Endpoints: https://documenter.getpostman.com/view/39459933/2sAYJ3EMdt

Endpoints: https://easypays-5691.postman.co/workspace/be740b79-bf54-4938-b627-edc8d035f242/overview

## Verificación

1. **Asegúrate de que ambos servidores están corriendo**:
   - El backend debería estar corriendo en `http://localhost:8080`.
   - El frontend debería estar corriendo en `http://localhost:3000`.

2. **Probar la Aplicación**:
   - Abre tu navegador y navega a `http://localhost:3000`.
   - Intenta registrarte, iniciar sesión, crear proyectos, y cargar tickets.