# Zafira App 🛒

Zafira es una tienda online que nace a raiz de la creacion de un e-comerce construida con React y Javascript como bases, siendo mi primer desafio como alumno del curso, dicha app permite a los usuarios navegar por un catálogo de productos, añadirlos al carrito de compras y proceder con el checkout. El proyecto está integrado con Firebase para la gestión del catálogo de productos y las órdenes generadas.

## Características
Catálogo de productos: Muestra productos disponibles para la compra con información como nombre, precio y descripción.
Carrito de compras: Los usuarios pueden agregar productos al carrito, ver el total y proceder al checkout.
Categorías: Los productos están organizados en categorías, y al hacer clic en una categoría, se muestran los productos de esa categoría.
Checkout: Los usuarios pueden completar su compra proporcionando su nombre, teléfono, email y dirección.
Conexión con Firebase: El proyecto está conectado a Firebase para almacenar los productos en la colección items y las órdenes en la colección orders.

## Tecnologías utilizadas

React: Biblioteca de JavaScript para construir la interfaz de usuario.
Firebase: Plataforma para almacenar y gestionar los productos y las órdenes.
React Router: Para manejar la navegación entre las diferentes páginas del sitio.
CSS/SASS: Para el diseño y estilo de la aplicación.

### Instalación
1. Clona este repositorio:
git clone <URL_DEL_REPOSITORIO>
2. Navega al directorio del proyecto:
cd zafira
3. Instala las dependencias:
npm install
4. Inicia el servidor de desarrollo:
npm start
5. Accede a la aplicación en tu navegador en http://localhost:5176.

## Funcionalidades
Página principal (/): Muestra el catálogo de productos.
Página de detalle de producto (/item/:id): Muestra la descripción completa de un producto.
Página de categorías (/category/:categoryId): Muestra los productos de una categoría específica.
Carrito de compras (/cart): Muestra los productos añadidos al carrito con la opción de eliminar productos o vaciar el carrito.
Checkout (/checkout): Los usuarios pueden completar su compra y recibir un ID de orden.

## Contribución
Si deseas contribuir a este proyecto, por favor sigue los siguientes pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama para tu característica:
git checkout -b nueva-caracteristica
3. Realiza tus cambios y haz commit:
git commit -am 'Añadir nueva característica'
4. Empuja tus cambios a tu repositorio:
git push origin nueva-caracteristica
5. Abre un pull request para que revisemos tus cambios.

## Contacto 📨
Si tienes alguna pregunta o sugerencia, no dudes en contactarme a través de [lucasmoran2015@gmail.com] o [https://github.com/Lucasmoran7].

