Task Manager API

API RESTful construida con NestJS para gestionar tareas con autenticación JWT.

Requisitos
- Node.js 16 o superior
- MySQL 8.x (o la base de datos que uses)
- npm 8 o superior

Configuración inicial

1. Navega al directorio del backend:
   cd backend

2. Instala las dependencias:
   npm install

3. Configura las variables de entorno:
   - Crea un archivo .env en la raíz del proyecto con:
     DB_HOST=localhost
     DB_PORT=3306
     DB_USER=root
     DB_PASSWORD=1234
     DB_NAME=prueba_norvento
   - Ajusta los valores según tu configuración de base de datos.

4. Configura la base de datos:
   - Asegúrate de que MySQL esté corriendo.
   - Crea la base de datos:
     CREATE DATABASE prueba_norvento;
   - Las tablas (users y tareas) se crean automáticamente al iniciar la aplicación gracias a synchronize: true en app.module.ts.
   - Si synchronize: false está configurado, crea las tablas manualmente con:
     CREATE TABLE users (
       id INT AUTO_INCREMENT PRIMARY KEY,
       nombre VARCHAR(255) NOT NULL,
       email VARCHAR(255) NOT NULL UNIQUE,
       password VARCHAR(255) NOT NULL
     );
     CREATE TABLE tareas (
       id INT AUTO_INCREMENT PRIMARY KEY,
       titulo VARCHAR(255) NOT NULL,
       descripcion TEXT,
       estado ENUM('pendiente', 'en progreso', 'completada') DEFAULT 'pendiente',
       usuarioId INT,
       FOREIGN KEY (usuarioId) REFERENCES users(id)
     );

Ejecución

1. Inicia el servidor en modo desarrollo:
   npm run start:dev
   - La API estará disponible en http://localhost:3000.

2. Accede a la documentación:
   - Abre http://localhost:3000/api para ver la documentación Swagger.

Endpoints principales

- Autenticación:
  - POST /auth/register: Registra un nuevo usuario.
    Ejemplo: {"nombre": "Test", "email": "test@example.com", "password": "1234"}
  - POST /auth/login: Inicia sesión y obtiene un token JWT.
    Ejemplo: {"email": "test@example.com", "password": "1234"}

- Tareas (requieren JWT en el header Authorization: Bearer <token>):
  - POST /tareas: Crea una tarea para el usuario autenticado.
    Ejemplo: {"titulo": "Tarea 1", "descripcion": "Hacer algo"}
  - GET /tareas: Lista las tareas del usuario autenticado.
  - GET /tareas/:id: Obtiene una tarea por ID.
  - PUT /tareas/:id: Actualiza una tarea.
    Ejemplo: {"titulo": "Tarea Actualizada", "estado": "en progreso"}
  - DELETE /tareas/:id: Elimina una tarea.

Tests unitarios
- Ejecuta los tests:
  npm run test
- Verifica la cobertura (si está configurado):
  npm run test:cov

Notas
- La base de datos se sincroniza automáticamente si synchronize: true está habilitado en app.module.ts.
- Usa Postman o Swagger para probar los endpoints.

## Despliegue con Docker

Este proyecto incluye un `Dockerfile` y un `docker-compose.yml` para facilitar el despliegue del backend (NestJS) y la base de datos (MySQL). Los archivos están configurados según las buenas prácticas y los requisitos de la prueba técnica:

- **Dockerfile**: Usa Node.js 20 como base, instala dependencias, compila el código TypeScript y expone el puerto 3000.
- **docker-compose.yml**: Define dos servicios: `app` (backend) y `db` (MySQL), con las variables de entorno necesarias para la conexión.

### Instrucciones de uso
1. Asegúrese de tener Docker y Docker Compose instalados.
2. Navegue a la raíz del proyecto (`PRUEBA NORVENTO/`).
3. Ejecute:
   ```bash
   docker compose up --build
4. El backend estará disponible en http://localhost:3000 y la base de datos en localhost:3306.

