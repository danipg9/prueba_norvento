Task Manager - Prueba Técnica Norvento

Este proyecto es una aplicación full-stack para gestionar tareas con autenticación JWT. Incluye un backend en NestJS v10.x y un frontend en React v18.x con TypeScript, estilizado con Material UI y estado global gestionado con React Context.

Requisitos previos
- Node.js: 20 o superior
- npm: 8 o superior
- MySQL: 8.x (para el backend)

Instalación

Backend
1. Navega al directorio del backend:
   cd back
2. Instala las dependencias:
   npm install
3. Configura las variables de entorno en un archivo .env (ver README en back/)
4. Inicia el servidor en modo desarrollo:
   npm run start:dev
   - Corre en http://localhost:3000

Frontend
1. Navega al directorio del frontend:
   cd front
2. Instala las dependencias:
   npm install
3. Inicia el servidor en modo desarrollo:
   npm start
   - Corre en http://localhost:3001
   - Requiere que el backend esté corriendo en http://localhost:3000

Uso
1. Abre tu navegador en http://localhost:3001/register
2. Registra un nuevo usuario con nombre, email y contraseña
3. Inicia sesión en http://localhost:3001/login con las credenciales creadas
4. Gestiona tus tareas en http://localhost:3001/tasks:
   - Crea una tarea (título obligatorio)
   - Edita o elimina tareas existentes
   - Cierra sesión con el botón Logout
5. Explora la documentación de la API en http://localhost:3000/api (Swagger)

Estructura del proyecto
- back/: API REST en NestJS con autenticación JWT, endpoints para tareas y tests unitarios
- front/: Aplicación React con TypeScript, Material UI, React Context y tests unitarios
- README.txt: Este archivo

Pruebas
- Backend: npm test (en el directorio back/, cubre login, creación y borrado de tareas)
- Frontend: npm test (en el directorio front/, cubre TaskList y renderizado)

Despliegue con Docker (Opcional)
1. Asegúrate de tener Docker y Docker Compose instalados
2. En la raíz del proyecto (donde está docker-compose.yml):
   docker compose up --build
3. El backend estará en http://localhost:3000 y la base de datos en localhost:3306
4. Para el frontend, construye manualmente con:
   cd front
   npm run build
5. Sirve los archivos estáticos desde un servidor (o intégralo en el backend)

Notas
- El backend usa una base de datos relacional (MySQL) con TypeORM
- El frontend usa AuthContext para autenticación y TaskContext para tareas
- Los endpoints de tareas están protegidos con JWT
- Consulta los READMEs específicos en back/ y front/ para más detalles