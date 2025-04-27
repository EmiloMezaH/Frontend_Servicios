# Frontend
Este proyecto implementa el frontend de un sistema conjunto de Gestión de Productos y generación de tickets para facturación electrónica.
Permite gestionar productos y crear facturas dinámicamente.

## Las funcionalidades principales son: 
- Lista de Productos: Visualizar productos existentes junto con su precio unitario.
- Crear Producto: Agregar nuevos productos especificando nombre y precio.
- Editar Producto: Modificar productos registrados.
- Eliminar Producto: Borrar productos existentes.
- Crear Factura: Seleccionar productos registrados anteriormente y definir cantidades para generar una factura detallada.
- Cálculos Automáticos: El sistema calcula automáticamente el subtotal, IVA y total de cada factura.

## Flujo de trabajo
- Crear productos mediante el formulario de "Nuevo Producto", agilizando el proceso de registro.
- Visualizar los productos en la sección "Lista de Productos".
- Generar facturas seleccionando productos y especificando la cantidad de dichos productos.
- El sistema realiza automáticamente el cálculo del Subtotal, IVA y Total.

## Tecnologías utilizadas
- HTML5
- CSS3
- TypeScript
- HttpClient (para llamadas REST)
- MySQL (como base de datos a través del backend)

## Estructura general
### Productos
- Los productos se almacenan en una base de datos MySQL, gestionada a través del backend.
- Operaciones disponibles: Crear, Leer, Actualizar y Eliminar productos (CRUD).

### Facturación
- Se generan facturas basadas en los productos disponibles.
- Cada factura incluye:
    - Fecha y hora de creación.
    - Listado de productos con cantidad, precio unitario y total por producto.
    - Subtotal, IVA y Total general.

### Interfaz de Usuario
- Proporciona un diseño sencillo, limpio y responsivo.
- Formularios específicos para gestionar productos y crear facturas.
- Validaciones básicas al crear o editar productos.

## Notas adicionales
- Este frontend depende del backend de Gestión de Productos y Facturación Electrónica para la persistencia de datos.
- Todas las operaciones CRUD interactúan mediante servicios REST expuestos por el backend.
