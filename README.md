Task Manager - Prueba Técnica Norvento

Este proyecto es una aplicación full-stack para gestionar tareas con autenticación JWT. Incluye un backend en NestJS y un frontend en React con TypeScript, estilizado con Material UI.

Requisitos previos
- Node.js (versión 16 o superior)
- npm (versión 8 o superior)

Instalación

Backend
1. Navega al directorio del backend:
   cd back
2. Instala las dependencias:
   npm install
3. Inicia el servidor en modo desarrollo:
   npm run start:dev
   (Corre en http://localhost:3000)

Frontend
1. Navega al directorio del frontend:
   cd front
2. Instala las dependencias:
   npm install
3. Inicia el servidor en modo desarrollo:
   npm start
   (Corre en http://localhost:3001)

Uso
1. Abre tu navegador en http://localhost:3001/register
2. Registra un nuevo usuario con nombre, email y contraseña
3. Inicia sesión en http://localhost:3001/login con las credenciales creadas
4. Gestiona tus tareas en http://localhost:3001/tasks:
   - Crea una tarea (título obligatorio)
   - Edita o elimina tareas existentes
   - Cierra sesión con el botón Logout
5. Explora la documentación de la API en http://localhost:3000/api

Estructura del proyecto
- back/: API en NestJS con autenticación JWT y endpoints para tareas
- front/: Aplicación React con TypeScript, Material UI y tests unitarios
- README.md: Este archivo

Pruebas
- Backend: npm test (en el directorio back)
- Frontend: npm test (en el directorio front, incluye tests para TaskList)

Notas
- El título de las tareas es obligatorio
- Usa credenciales válidas para iniciar sesión
- El backend usa JWT para proteger las rutas de tareas

Despliegue
1. Construye el frontend:
   cd front
   npm run build
2. Sirve los archivos estáticos desde el backend o un servidor separado
3. Configura variables de entorno si cambias los puertos o URLs