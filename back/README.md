Task Manager API

API RESTful construida con NestJS v10.x y TypeScript para gestionar tareas con autenticación basada en JWT. Este proyecto utiliza el framework NestJS, un entorno progresivo de Node.js para aplicaciones server-side eficientes y escalables.

Requisitos
- Node.js: 20 o superior
- MySQL: 8.x
- npm: 8 o superior

Configuración inicial

1. Navega al directorio del backend:
   cd back

2. Instala las dependencias:
   npm install

3. Configura las variables de entorno:
   - Crea un archivo .env en la raíz del proyecto con:
     DB_HOST=localhost
     DB_PORT=3306
     DB_USER=root
     DB_PASSWORD=1234
     DB_NAME=prueba_norvento
     JWT_SECRET=tu_secreto_aqui
   - Ajusta los valores según tu entorno.

4. Configura la base de datos:
   - Asegúrate de que MySQL esté corriendo.
   - Crea la base de datos:
     CREATE DATABASE prueba_norvento;
   - Las tablas (users y tareas) se crean automáticamente al iniciar la aplicación si synchronize: true está habilitado en app.module.ts. Nota: No uses synchronize: true en producción; en ese caso, crea las tablas manualmente:
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

2. Otras opciones de ejecución:
   - Modo producción: npm run start:prod
   - Modo básico: npm run start

3. Accede a la documentación Swagger:
   - Abre http://localhost:3000/api.

Endpoints principales

Autenticación
- POST /auth/register: Registra un nuevo usuario.
  - Ejemplo: {"nombre": "Test", "email": "test@example.com", "password": "1234"}
- POST /auth/login: Inicia sesión y devuelve un token JWT.
  - Ejemplo: {"email": "test@example.com", "password": "1234"}

Tareas (Requieren JWT en Authorization: Bearer <token>)
- POST /tareas: Crea una tarea.
  - Ejemplo: {"titulo": "Tarea 1", "descripcion": "Hacer algo"}
- GET /tareas: Lista las tareas del usuario autenticado.
- GET /tareas/:id: Obtiene una tarea por ID.
- PUT /tareas/:id: Actualiza una tarea.
  - Ejemplo: {"titulo": "Tarea Actualizada", "estado": "en progreso"}
- DELETE /tareas/:id: Elimina una tarea.

Nota: Los endpoints incluyen validaciones de datos y manejo de errores con mensajes claros.

Tests unitarios
- Ejecuta los tests unitarios:
  npm run test
- Ejecuta los tests end-to-end:
  npm run test:e2e
- Verifica la cobertura:
  npm run test:cov

Despliegue con Docker

1. Asegúrate de tener Docker y Docker Compose instalados.
2. Navega a la raíz del proyecto.
3. Ejecuta:
   docker compose up --build
4. El backend estará disponible en http://localhost:3000 y la base de datos en localhost:3306.
5. Para detener los contenedores:
   docker compose down

Despliegue en producción
- Compila el proyecto para producción:
  npm run build
- Inicia en modo producción:
  npm run start:prod
- Consulta la documentación de NestJS para más detalles: https://docs.nestjs.com/deployment

Recursos
- Documentación oficial de NestJS: https://docs.nestjs.com
- Soporte y comunidad: https://discord.gg/G7Qnnhy
- Repositorio base de NestJS: https://github.com/nestjs/nest

Notas
- Este proyecto usa TypeORM para la persistencia de datos en MySQL.
- La API sigue una arquitectura modular y buenas prácticas de NestJS.
- Usa Postman o Swagger para probar los endpoints.