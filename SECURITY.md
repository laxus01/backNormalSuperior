# 🔒 Guía de Seguridad - Backend Normal Superior

## 🛡️ Medidas de Seguridad Implementadas

### **1. Autenticación y Autorización**
- ✅ **JWT Tokens** con expiración configurable
- ✅ **Hash de contraseñas** con bcrypt (12 rounds)
- ✅ **Middleware de autenticación** para rutas protegidas
- ✅ **Logging de eventos de seguridad** (intentos de login, accesos)

### **2. Rate Limiting**
- ✅ **Rate limiting general**: 100 requests/15min por IP
- ✅ **Rate limiting de autenticación**: 5 intentos/15min por IP
- ✅ **Rate limiting estricto**: 10 requests/hora para operaciones sensibles

### **3. Headers de Seguridad**
- ✅ **Helmet.js** configurado con CSP
- ✅ **HSTS** habilitado (31536000 segundos)
- ✅ **X-Content-Type-Options**: nosniff
- ✅ **X-Frame-Options**: DENY
- ✅ **X-XSS-Protection**: habilitado

### **4. Validación y Sanitización**
- ✅ **express-validator** para validación de entrada
- ✅ **Sanitización automática** de XSS y SQL injection
- ✅ **Validación de fortaleza de contraseñas**
- ✅ **Límites de tamaño** en body parsing (10MB)

### **5. CORS y Configuración**
- ✅ **CORS específico** por origen permitido
- ✅ **Variables de entorno** para credenciales sensibles
- ✅ **Configuración separada** por ambiente

### **6. Logging y Monitoreo**
- ✅ **Winston logger** estructurado
- ✅ **Logs de seguridad** separados
- ✅ **Detección de patrones sospechosos**
- ✅ **Rotación automática** de logs

## 🚨 Configuración de Seguridad

### **Variables de Entorno Críticas**

```bash
# JWT - OBLIGATORIO cambiar en producción
JWT_SECRET=tu_clave_super_secreta_minimo_32_caracteres

# Base de datos - NO exponer credenciales
DB_PASSWORD=tu_password_seguro

# Configuración de seguridad
BCRYPT_ROUNDS=12
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### **Configuración CORS**

```javascript
// Solo orígenes específicos permitidos
ALLOWED_ORIGINS=https://tudominio.com,https://app.tudominio.com
```

## 🔐 Uso de Autenticación

### **Login Seguro**

```javascript
// Endpoint: POST /users/login
{
  "login": "usuario",
  "password": "contraseña_segura"
}

// Respuesta exitosa:
{
  "res": {
    "message": "Autenticación correcta",
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "name": "Nombre Usuario",
    "expiresIn": "24h"
  }
}
```

### **Uso del Token**

```javascript
// Headers requeridos para rutas protegidas
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIs...",
  "Content-Type": "application/json"
}
```

## 🛡️ Rutas Protegidas

### **Niveles de Protección**

1. **Públicas**: `/users/login`
2. **Autenticadas**: Requieren token JWT válido
3. **Sensibles**: Autenticación + rate limiting estricto
4. **Admin**: Autenticación + permisos de administrador

### **Implementación**

```javascript
// Ruta autenticada
router.get('/protected', protectRoute, controller.method);

// Ruta sensible
router.delete('/sensitive', protectSensitiveRoute, controller.method);

// Ruta de admin
router.post('/admin-only', protectRoute, adminOnly, controller.method);
```

## 📊 Monitoreo de Seguridad

### **Logs de Seguridad**

Los eventos se registran en `logs/security.log`:

- ✅ Intentos de login exitosos/fallidos
- ✅ Accesos con tokens inválidos/expirados
- ✅ Violaciones de rate limiting
- ✅ Patrones de ataque detectados
- ✅ Accesos CORS bloqueados

### **Patrones Monitoreados**

```javascript
// Detección automática de:
- Path traversal: /../, /etc/, /proc/
- SQL Injection: UNION, SELECT, DROP, etc.
- XSS: <script>, javascript:, onload=
- Code injection: eval(), setTimeout()
```

## 🚀 Despliegue Seguro

### **Checklist de Producción**

- [ ] **JWT_SECRET** único y seguro (mínimo 32 caracteres)
- [ ] **DB_PASSWORD** fuerte y no expuesta
- [ ] **NODE_ENV=production** configurado
- [ ] **HTTPS** habilitado en el servidor web
- [ ] **Firewall** configurado (solo puertos necesarios)
- [ ] **Logs** monitoreados y respaldados
- [ ] **Rate limits** ajustados según tráfico esperado

### **Variables de Entorno Mínimas**

```bash
NODE_ENV=production
JWT_SECRET=clave_super_secreta_produccion_32_chars_min
DB_HOST=tu_host_db
DB_USER=tu_usuario_db
DB_PASSWORD=password_super_seguro
DB_NAME=tu_base_datos
ALLOWED_ORIGINS=https://tudominio.com
```

## 🔍 Auditoría de Seguridad

### **Comandos de Verificación**

```bash
# Verificar dependencias vulnerables
npm audit

# Corregir vulnerabilidades automáticamente
npm audit fix

# Verificar configuración
npm run security-check
```

### **Pruebas de Penetración**

Endpoints a probar:

1. **Rate Limiting**: Múltiples requests rápidos
2. **SQL Injection**: Payloads maliciosos en parámetros
3. **XSS**: Scripts en campos de entrada
4. **JWT**: Tokens manipulados/expirados
5. **CORS**: Requests desde orígenes no permitidos

## ⚠️ Vulnerabilidades Conocidas

### **Pendientes de Resolver**

1. **Contraseñas en texto plano**: Migrar usuarios existentes a bcrypt
2. **Credenciales hardcodeadas**: Mover completamente a variables de entorno
3. **Validación de entrada**: Expandir validaciones en todos los módulos

### **Recomendaciones Adicionales**

- 🔒 Implementar **2FA** para usuarios administrativos
- 🔄 **Rotación automática** de JWT secrets
- 📱 **Notificaciones** de accesos sospechosos
- 🛡️ **WAF** (Web Application Firewall) en producción
- 📊 **SIEM** para correlación de eventos de seguridad

## 📞 Contacto de Seguridad

Para reportar vulnerabilidades de seguridad:
- 📧 Email: security@tudominio.com
- 🔒 Usar cifrado PGP para información sensible
- ⏱️ Tiempo de respuesta: 24-48 horas

---

**Última actualización**: Octubre 2025  
**Versión**: 2.0.0 (Post-refactorización de seguridad)
