// Capa de datos: simulamos una base de datos con un arreglo
// y además guardamos todo en un archivo productos.txta simulando la base de datos

const fs = require('fs');
const path = require('path');

const RUTA_ARCHIVO = path.join(__dirname, 'productos.txt');

//  Cargar datos desde el archivo 
let productos = [];

if (fs.existsSync(RUTA_ARCHIVO)) {
  try {
    const contenido = fs.readFileSync(RUTA_ARCHIVO, 'utf8');
    if (contenido.trim() !== '') {
      productos = JSON.parse(contenido);
    }
  } catch (e) {
    console.log('No se pudo leer productos.txt, se empieza con lista vacía.');
    productos = [];
  }
}

//  Función para guardar el arreglo al archivo 
function guardarEnArchivo() {
  fs.writeFileSync(RUTA_ARCHIVO, JSON.stringify(productos, null, 2), 'utf8');
}

// Guarda un producto nuevo
function guardarProducto(producto) {
  productos.push(producto);
  guardarEnArchivo();
}

// Devuelve todos los productos
function obtenerProductos() {
  return productos;
}

// Buscar por nombre 
function buscarPorNombre(nombre) {
  const n = nombre.toLowerCase();
  return productos.filter((p) => p.nombre.toLowerCase().includes(n));
}

// Eliminar por nombre 
function eliminarPorNombre(nombre) {
  const n = nombre.toLowerCase();
  const antes = productos.length;

  productos = productos.filter((p) => p.nombre.toLowerCase() !== n);
  const despues = productos.length;

  guardarEnArchivo();

  return antes !== despues; // Tiene que mostrarme si lo elimino 
}

module.exports = {
  guardarProducto,
  obtenerProductos,
  buscarPorNombre,
  eliminarPorNombre,
};
