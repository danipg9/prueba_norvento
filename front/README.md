Task Manager Frontend

Frontend en React v18.x con TypeScript para gestionar tareas consumiendo una API REST, estilizado con Material UI y con estado global gestionado mediante React Context. Este proyecto fue inicializado con Create React App.

Requisitos
- Node.js: 20 o superior
- npm: 8 o superior

Instalación

1. Navega al directorio del frontend:
   cd front

2. Instala las dependencias:
   npm install

Ejecución

1. Inicia el servidor en modo desarrollo:
   npm start
   - Corre en http://localhost:3001
   - Requiere que el backend esté corriendo en http://localhost:3000 (ver README del backend para configurarlo)

Rutas principales
- /18: Formulario para registrar un nuevo usuario
- /login: Formulario para iniciar sesión (con enlace a /register)
- /tasks: Lista de tareas con funcionalidades CRUD (crear, leer, editar, eliminar)

Características
- Autenticación con JWT gestionada mediante AuthContext y almacenada en localStorage
- Lista de tareas y operaciones CRUD gestionadas mediante TaskContext
- Estado global manejado con React Context (AuthContext y TaskContext)
- Formularios validados (título obligatorio para tareas)
- Estilos con Material UI usando componentes reutilizables (botones, tablas, diálogos)
- Navegación con react-router-dom v6.x
- Componentes modulares y reutilizables siguiendo buenas prácticas de React

Tests unitarios
- Ejecuta los tests:
  npm test
- Tests incluidos:
  - TaskList: Verifica renderizado, edición y eliminación de tareas
  - Auth: Verifica redirección tras login exitoso (si aplica)

Compilación para producción
- Construye la aplicación para producción:
  npm run build
- Genera la carpeta build/ optimizada y lista para despliegue

Personalización avanzada (Opcional)
- Para personalizar configuraciones (Webpack, Babel, etc.):
  npm run eject
- Nota: Esta operación es irreversible y elimina la dependencia de Create React App.

Notas
- Asegúrate de que el backend esté corriendo en http://localhost:3000 antes de iniciar el frontend
- Accede a la aplicación en http://localhost:3001
- Los tokens JWT se gestionan en AuthContext y se envían en las cabeceras de las peticiones autenticadas

Recursos
- Documentación de Create React App: https://facebook.github.io/create-react-app/docs/getting-started
- Documentación de React: https://reactjs.org/