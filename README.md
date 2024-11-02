                                Documentación Básica
        Estructura de la Base de Datos

----La base de datos incluye las siguientes tablas y sus relaciones:
Users: Almacena la información de los usuarios con campos como username, password, y roleId.
Roles: Define los roles de usuario (por ejemplo, "Admin", "User") con un campo único nombreRole.
ClaseVuelos: Contiene las clases de vuelo (por ejemplo, "Económica", "Primera Clase") con el campo nombreClase.
Reservas: Almacena las reservas de vuelo, incluyendo codigoReserva, fechaInicio, fechaFinal, y estado.
DatosVuelos: Registra detalles del vuelo de cada usuario, como user_id, reserva_id, clasevuelo_id, pasaporte, asiento, numero_vuelo y status.

----Relaciones:
Un Usuario puede tener varios roles mediante roleId.
Una Reserva puede tener varios registros en DatosVuelos.
Una ClaseVuelo puede estar asociada a varios registros en DatosVuelos.

----Arquitectura de la Aplicación
La aplicación sigue una arquitectura MVC (Modelo-Vista-Controlador) con una separación clara entre las capas:

Modelos: Definidos en la carpeta /models, representan las tablas de la base de datos y sus asociaciones. Ejemplo: User, Role, ClaseVuelo, Reserva, DatosVuelo.
Controladores: Ubicados en /controllers, manejan la lógica de negocio y operaciones CRUD para cada entidad. Ejemplo: userController, reservaController, claseVueloController.
Rutas: Definidas en la carpeta /routes, se configuran para cada entidad, conectando las solicitudes HTTP con los métodos del controlador correspondiente.
Autenticación: Utiliza JWT para proteger rutas específicas, verificando el token de los usuarios.
Swagger: Documentación API generada automáticamente para una fácil visualización de los endpoints y sus descripciones.

----Enlace al Sitio de Pruebas
El sitio de pruebas está desplegado en [https://reservuelos.netlify.app/]. Puedes acceder a la documentación API en [https://reservuelos.onrender.com/api-docs/] para ver todos los endpoints disponibles y probar las funcionalidades.
