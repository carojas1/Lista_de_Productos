const repo = require('../datos/productoRepository');

const IVA = 0.15;

function registrarProducto(nombre, precioBase) {
  if (!nombre || nombre.trim() === "") {
    throw new Error("El nombre es obligatorio");
  }

  const precio = Number(precioBase);
  if (isNaN(precio) || precio <= 0) {
    throw new Error("Precio inválido");
  }

  const precioFinal = precio + precio * IVA;

  const producto = {
    nombre: nombre.trim(),
    precioBase: precio,
    precioFinal
  };

  repo.guardarProducto(producto);

  return producto;
}

function listarProductos() {
  return repo.obtenerProductos();
}

module.exports = {
  registrarProducto,
  listarProductos
};
