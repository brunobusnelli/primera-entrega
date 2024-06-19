// productos.js

let productos = [];
let currentId = 1;

function generarId() {
    return currentId++;
}

function agregarProducto(producto) {
    productos.push(producto);
}

function eliminarProducto(idProducto) {
    productos = productos.filter(producto => producto.id !== idProducto);
}

export { productos, generarId, agregarProducto, eliminarProducto };
