import fs from 'fs';
import path from 'path';

const productosPath = path.resolve('productos.json');

const readProductosFromFile = () => {
    try {
        const data = fs.readFileSync(productosPath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error leyendo productos:', err);
        return [];
    }
};

const writeProductosToFile = (productos) => {
    try {
        fs.writeFileSync(productosPath, JSON.stringify(productos, null, 2));
    } catch (err) {
        console.error('Error escribiendo productos:', err);
    }
};

const productos = readProductosFromFile();

const generarId = () => {
    let mayorId = 0;

    productos.forEach((producto) => {
        if (producto.id > mayorId) {
            mayorId = producto.id;
        }
    });

    return mayorId + 1;
};

const agregarProducto = (producto) => {
    productos.push(producto);
    writeProductosToFile(productos);
};

const actualizarProducto = (id, nuevosDatos) => {
    const indice = productos.findIndex(producto => producto.id === id);
    if (indice >= 0) {
        productos[indice] = { ...productos[indice], ...nuevosDatos };
        writeProductosToFile(productos);
    }
};

const eliminarProducto = (id) => {
    const indice = productos.findIndex(producto => producto.id === id);
    if (indice >= 0) {
        productos.splice(indice, 1);
        writeProductosToFile(productos);
    }
};

export { productos, generarId, agregarProducto, actualizarProducto, eliminarProducto };
