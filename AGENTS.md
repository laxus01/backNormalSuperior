# AGENTS.md 🤖

Este archivo contiene las instrucciones clave para los agentes de codificación que trabajan en este repositorio. Proporciona el contexto necesario para garantizar la coherencia, calidad y el cumplimiento de los estándares de desarrollo.

---

## 🛠️ Configuración y Ejecución

Los agentes deben usar los siguientes comandos para configurar y validar el código:

* **Instalar Dependencias:**
    ```bash
    npm install
    ```
* **Ejecutar Pruebas Unitarias:** Siempre ejecuta esto al final de cualquier tarea y antes de generar una *pull request*.
    ```bash
    npm test
    ```
* **Ejecutar Linter:** Asegúrate de que el código cumpla con el estilo antes de *commitear*.
    ```bash
    npm run lint
    ```

---
## 📁 Estructura Modular Obligatoria (Patrón Controller-Service-Repository)

Toda nueva funcionalidad o refactorización debe organizarse bajo una **estructura de Módulos (carpetas)** en `src/`, donde cada módulo representa una Entidad o Dominio de Negocio (ej: `usuarios`, `productos`).

### 1. **Estructura de Carpeta Módulo:**

El contenido interno de cada módulo **debe** seguir el siguiente orden y convención:

src/ └── [nombre-del-modulo]/ ├── [nombre-del-modulo].module.ts (Archivo de MÓDULO/Ensamblador) ├── [nombre-del-modulo].controller.ts (Capa de CONTROLADOR / Maneja HTTP) ├── [nombre-del-modulo].service.ts (Capa de SERVICIO / Lógica de Negocio) ├── dtos/ (Objetos de Transferencia de Datos / Validación de entrada/salida) ├── interfaces/ (Interfaces / Contratos de TypeScript/Java) └── repositories/ (Capa de Repositorio / Acceso y Persistencia de DB)

### 2. **Reglas de Capas (Refuerzo SOLID):**

* El **Controller** solo debe llamar al **Service**.
* El **Service** solo debe llamar al **Repository** para acceder a datos.
* El **Repository** **NO** debe contener lógica de negocio; solo lógica de datos.
* El agente debe usar los **DTOs** para la validación de todos los datos de entrada en el Controller.

---
## ✏️ Convenciones de Codificación (Código Limpio)

### 1. Nomenclatura de Funciones

Todas las funciones nuevas o modificadas deben seguir la convención **`camelCase`**.

* **Regla:** El nombre de la función debe comenzar con minúscula y cada palabra subsiguiente debe comenzar con mayúscula.

### 2. Principios SOLID y Reutilización de Código

El código debe adherirse a los principios de diseño de software para garantizar su mantenibilidad y escalabilidad.

| Principio | Objetivo para el Agente | Énfasis Clave |
| :--- | :--- | :--- |
| **Código Reutilizable** | **Evitar la Repetición de Código (DRY - Don't Repeat Yourself).** | Si se identifica lógica duplicada, **refactorizar en una función común y aislada**. |
| **Separación de Responsabilidades (SRP)** | Las clases/funciones deben tener **una sola razón para cambiar**. | Cada archivo en la estructura modular debe cumplir su rol (ej: el Controller no hace lógica de negocio). |
| **Abierto/Cerrado (OCP)** | El código debe estar **abierto a la extensión**, pero **cerrado a la modificación**. | Usar interfaces o abstracciones para permitir la adición de nueva funcionalidad sin alterar el código existente. |

### 3. Mensajes de Commit

Los mensajes deben ser claros y seguir el formato **`tipo(área): descripción`**.

* **Tipos Aceptados:** `feat` (nueva característica), `fix` (corrección), `refactor` (reestructuración), `style` (formato).

---

## 💡 Consejos para el Agente

### Flujo de Desarrollo (TDD)
El agente debe seguir estrictamente el flujo de **Test-Driven Development (TDD)** en todas las nuevas implementaciones o correcciones.

1.  **RED (Falla):** Escribe una **prueba unitaria** que falle.
2.  **GREEN (Pasa):** Escribe la **cantidad mínima de código** necesario para que esa prueba pase.
3.  **REFACTOR (Refactorizar):** Aplica las reglas de la Estructura Modular (Sección 2) y SOLID/DRY (Sección 3) para limpiar el código, asegurándote siempre de que la prueba unitaria siga pasando (`npm test`).

### Consejos Generales
* **Contexto de Archivos:** Antes de modificar un archivo, lee la documentación del módulo circundante para comprender su **responsabilidad única** y el patrón de capas.
* **Prioridad:** La **reutilización de código (DRY)** tiene la máxima prioridad durante la fase de Refactor (Paso 3 de TDD).
* **Verificación:** Confirma el éxito de las tareas ejecutando `npm test` y `npm run lint` antes de sugerir el cambio.