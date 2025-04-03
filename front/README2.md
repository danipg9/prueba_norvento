Task Manager Frontend

Frontend en React con TypeScript para gestionar tareas, estilizado con Material UI.

Requisitos
- Node.js 16 o superior
- npm 8 o superior

Instalación

1. Navega al directorio del frontend:
   cd front

2. Instala las dependencias:
   npm install

Ejecución

1. Inicia el servidor en modo desarrollo:
   npm start
   - Corre en http://localhost:3001
   - Requiere que el backend esté corriendo en http://localhost:3000

Rutas principales
- /register: Formulario para registrar un nuevo usuario
- /login: Formulario para iniciar sesión (con enlace a registro)
- /tasks: Lista de tareas con CRUD (crear, editar, eliminar)

Características
- Autenticación con JWT almacenada en localStorage
- Formularios validados (título obligatorio para tareas)
- Estilos con Material UI
- Navegación con react-router-dom

Tests unitarios
- Ejecuta los tests:
  npm test
- Tests incluidos:
  - TaskList: Verifica renderizado, edición y eliminación de tareas

Notas
- Asegúrate de que el backend esté corriendo antes de iniciar el frontend
- Usa http://localhost:3001 para acceder a la aplicación