const readline = require('readline');
const chalk = require('chalk');
const service = require('../logica/productoService');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function mostrarMenu() {
  console.log(chalk.cyan('\n=== SISTEMA DE PRODUCTOS ==='));
  console.log(chalk.yellow('1. Ingresar producto'));
  console.log(chalk.yellow('2. Ver lista de productos'));
  console.log(chalk.yellow('3. Buscar producto por nombre'));
  console.log(chalk.yellow('4. Eliminar producto por nombre'));
  console.log(chalk.yellow('5. Salir'));

  rl.question(chalk.green('Elige una opción: '), (op) => {
    switch (op) {
      case '1':
        ingresarProducto();
        break;
      case '2':
        mostrarLista();
        break;
      case '3':
        buscarProducto();
        break;
      case '4':
        eliminarProducto();
        break;
      case '5':
        salir();
        break;
      default:
        console.log(chalk.red('Opción inválida'));
        mostrarMenu();
    }
  });
}

function ingresarProducto() {
  rl.question(chalk.green('Nombre del producto: '), (nombre) => {
    rl.question(chalk.green('Precio base: '), (precio) => {
      try {
        const p = service.registrarProducto(nombre, precio);

        console.log(chalk.blue('\nProducto ingresado:'));
        console.log(`- Nombre: ${p.nombre}`);
        console.log(`- Precio base: $${p.precioBase}`);
        console.log(`- Precio final (IVA): $${p.precioFinal.toFixed(2)}`);
      } catch (err) {
        console.log(chalk.red('Error:'), err.message);
      }
      mostrarMenu();
    });
  });
}

function mostrarLista() {
  const lista = service.listarProductos();

  console.log(chalk.cyan('\n=== LISTA DE PRODUCTOS ==='));

  if (lista.length === 0) {
    console.log(chalk.gray('No hay productos aún.'));
  } else {
    lista.forEach((p, i) => {
      console.log(chalk.blue(`\nProducto #${i + 1}`));
      console.log(`  Nombre: ${p.nombre}`);
      console.log(`  Precio base: $${p.precioBase}`);
      console.log(`  Precio final: $${p.precioFinal.toFixed(2)}`);
    });
  }

  mostrarMenu();
}

function buscarProducto() {
  rl.question(chalk.green('Nombre (o parte del nombre) a buscar: '), (nombre) => {
    try {
      const resultados = service.buscarProductos(nombre);

      console.log(chalk.cyan('\n=== RESULTADOS DE BÚSQUEDA ==='));

      if (resultados.length === 0) {
        console.log(chalk.gray('No se encontraron productos.'));
      } else {
        resultados.forEach((p, i) => {
          console.log(chalk.blue(`\nResultado #${i + 1}`));
          console.log(`  Nombre: ${p.nombre}`);
          console.log(`  Precio base: $${p.precioBase}`);
          console.log(`  Precio final: $${p.precioFinal.toFixed(2)}`);
        });
      }
    } catch (err) {
      console.log(chalk.red('Error:'), err.message);
    }
    mostrarMenu();
  });
}

function eliminarProducto() {
  rl.question(chalk.green('Nombre EXACTO del producto a eliminar: '), (nombre) => {
    try {
      const eliminado = service.eliminarProducto(nombre);
      if (eliminado) {
        console.log(chalk.blue('\nProducto(s) eliminado(s) correctamente.'));
      } else {
        console.log(chalk.gray('\nNo se encontró ningún producto con ese nombre.'));
      }
    } catch (err) {
      console.log(chalk.red('Error:'), err.message);
    }
    mostrarMenu();
  });
}

function salir() {
  console.log(chalk.magenta('\nPrograma finalizado. '));
  rl.close();
}

mostrarMenu();
