# Backend Normal Superior

Sistema de gestión educativa para una Escuela Normal Superior desarrollado en Node.js con arquitectura modular siguiendo el patrón **Controller-Service-Repository**.

## 🏗️ Arquitectura

Este proyecto ha sido refactorizado siguiendo las mejores prácticas de desarrollo y los principios SOLID:

### Estructura Modular

```
src/
├── campus/                 # Módulo de gestión de sedes
│   ├── campus.module.js    # Ensamblador de rutas
│   ├── campus.controller.js # Controlador HTTP
│   ├── campus.service.js   # Lógica de negocio
│   ├── dtos/              # Validación de datos
│   ├── interfaces/        # Contratos TypeScript/JSDoc
│   └── repositories/      # Acceso a datos
├── institutions/          # Módulo de instituciones
├── practices/            # Módulo de prácticas pedagógicas
├── students/             # Módulo de estudiantes
├── teachers/             # Módulo de docentes
├── users/                # Módulo de usuarios y autenticación
├── shared/               # Recursos compartidos
│   └── middlewares/      # Middlewares comunes
├── configs/              # Configuración
├── database.js           # Conexión a base de datos
├── keys.js              # Credenciales de BD
└── index.js             # Punto de entrada
```

### Patrón Controller-Service-Repository

- **Controller**: Maneja las peticiones HTTP y respuestas
- **Service**: Contiene la lógica de negocio y validaciones
- **Repository**: Acceso exclusivo a la base de datos
- **DTOs**: Validación de datos de entrada
- **Interfaces**: Documentación de contratos

## 🚀 Instalación y Ejecución

### Prerrequisitos
- Node.js >= 14
- MySQL
- npm

### Instalación

```bash
# Clonar el repositorio
git clone <repository-url>

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales reales

# Instalar dependencias de seguridad
npm install bcryptjs dotenv helmet express-rate-limit winston
```

### Ejecución

```bash
# Desarrollo con recarga automática
npm run dev

# Producción
npm start

# Ejecutar tests
npm test
```

## 📋 Módulos del Sistema

### 🏫 Campus
- Gestión de sedes educativas
- Administración de supervisores
- Manejo de grados y grupos
- Jornadas académicas

**Endpoints principales:**
- `POST /api/campus` - Crear sede
- `GET /api/campus` - Listar sedes
- `POST /api/campus/saveSupervisor` - Crear supervisor
- `GET /api/campus/getDegrees` - Obtener grados

### 🏛️ Institutions
- CRUD de instituciones educativas
- Gestión de rectores y sectores

**Endpoints:**
- `POST /api/institutions` - Crear institución
- `GET /api/institutions` - Listar instituciones
- `PUT /api/institutions/update/:id` - Actualizar institución

### 👨‍🎓 Students
- Gestión de maestros en formación
- Sistema de matrículas por período
- Estados de estudiantes

**Endpoints:**
- `POST /api/students` - Registrar estudiante
- `POST /api/students/saveEnroll` - Matricular estudiante
- `GET /api/students/enrollments` - Ver matrículas

### 👨‍🏫 Teachers
- Administración de maestros titulares
- Asignación por sedes

**Endpoints:**
- `POST /api/teachers` - Crear docente
- `GET /api/teachers` - Listar docentes
- `PUT /api/teachers/update/:id` - Actualizar docente

### 📚 Practices
- Gestión de prácticas pedagógicas
- Sistema de asignaciones
- Calificaciones y evaluaciones
- Consolidados de notas

**Endpoints principales:**
- `POST /api/practices` - Crear práctica
- `POST /api/practices/saveAssign` - Asignar práctica
- `POST /api/practices/saveRecord` - Registrar calificación
- `GET /api/practices/consolidateRecords` - Ver consolidado

### 👤 Users
- Autenticación con JWT
- Gestión de usuarios del sistema

**Endpoints:**
- `POST /users/login` - Iniciar sesión

## 🛠️ Tecnologías

- **Backend**: Node.js, Express.js
- **Base de datos**: MySQL
- **Autenticación**: JWT (JSON Web Tokens)
- **Validación**: express-validator
- **Testing**: Jest
- **Desarrollo**: Nodemon
- **Logging**: Morgan

## 🔒 Seguridad

- ✅ **Autenticación JWT** con tokens seguros y expiración
- ✅ **Hash de contraseñas** con bcrypt (12 rounds)
- ✅ **Rate limiting** multinivel (general, auth, sensible)
- ✅ **Headers de seguridad** con Helmet.js y HSTS
- ✅ **Validación robusta** con express-validator
- ✅ **Sanitización automática** contra XSS y SQL injection
- ✅ **CORS específico** por origen permitido
- ✅ **Logging de seguridad** con Winston
- ✅ **Variables de entorno** para credenciales
- ✅ **Monitoreo de patrones** sospechosos

> 📋 Ver [SECURITY.md](./SECURITY.md) para guía completa de seguridad

## 📊 Base de Datos

El sistema utiliza MySQL con **18 tablas** completamente validadas:

### **🏛️ Gestión Institucional**
- `instituciones` - Instituciones educativas (rector, sector, dirección)
- `sedes` - Campus por institución (coordinador, supervisor)
- `supervisores` - Supervisores de práctica

### **👥 Gestión de Usuarios**
- `users` - Sistema de autenticación (admin, permisos)
- `estudiantes` - Maestros en formación (identificación única)
- `docentes` - Maestros titulares por sede
- `estado_estudiantes` - Estados de estudiantes

### **📚 Estructura Académica**
- `semestres` - Semestres académicos (orden)
- `grupos` - Grupos por semestre
- `detalle_grupoc` - Detalle de grupos por sede/grado
- `periodos` - Períodos académicos
- `jornadas` - Jornadas (mañana, tarde, noche)

### **🎓 Gestión de Prácticas**
- `solicitudes` - Prácticas pedagógicas disponibles
- `solicitudes_asignadas` - Asignaciones estudiante-práctica
- `tipopractica` - Tipos de práctica pedagógica
- `notas_practicas` - Calificaciones y evaluaciones
- `juicios` - Criterios de evaluación

### **📋 Gestión Académica**
- `matriculas_periodo` - Matrículas por período
- `estudiantes_graduados` - Registro de graduados

> 🔍 **Validación**: Ejecuta `npm run validate-db` para verificar la estructura

## 🧪 Testing

```bash
# Ejecutar todos los tests
npm test

# Ejecutar tests con cobertura
npm run test:coverage
```

## 📝 Contribución

1. Seguir las reglas definidas en `AGENTS.md`
2. Mantener el patrón Controller-Service-Repository
3. Agregar validaciones DTOs para nuevos endpoints
4. Documentar interfaces con JSDoc
5. Escribir tests para nueva funcionalidad

## 🚨 Notas de Seguridad

⚠️ **IMPORTANTE**: 
- Las credenciales de base de datos están expuestas en `keys.js`
- Se recomienda usar variables de entorno en producción
- Implementar hash de contraseñas para usuarios

## 📄 Licencia

ISC

## 👥 Equipo de Desarrollo

Desarrollado siguiendo los principios de código limpio y arquitectura modular para facilitar el mantenimiento y escalabilidad del sistema.
