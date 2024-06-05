import fs from 'fs';
import path from 'path';

const carritosPath = path.resolve('carrito.json');

const readCarritosFromFile = () => {
    try {
        const data = fs.readFileSync(carritosPath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error leyendo carritos:', err);
        return [];
    }
};

const writeCarritosToFile = (carritos) => {
    try {
        fs.writeFileSync(carritosPath, JSON.stringify(carritos, null, 2));
    } catch (err) {
        console.error('Error escribiendo carritos:', err);
    }
};

const carritos = readCarritosFromFile();

const generarIdCarrito = () => {
    let mayorId = 0;

    carritos.forEach((carrito) => {
        if (carrito.id > mayorId) {
            mayorId = carrito.id;
        }
    });

    return mayorId + 1;
};

const crearCarrito = () => {
    const nuevoCarrito = {
        id: generarIdCarrito(),
        products: []
    };

    carritos.push(nuevoCarrito);
    writeCarritosToFile(carritos);
    return nuevoCarrito;
};

const obtenerCarritoPorId = (id) => {
    return carritos.find(carrito => carrito.id === Number(id));
};

const agregarProductoACarrito = (carritoId, productoId) => {
    const carrito = obtenerCarritoPorId(carritoId);

    if (!carrito) {
        return null;
    }

    const productoExistente = carrito.products.find(product => product.product === productoId);

    if (productoExistente) {
        productoExistente.quantity += 1;
    } else {
        carrito.products.push({ product: productoId, quantity: 1 });
    }

    writeCarritosToFile(carritos);
    return carrito;
};

export { carritos, crearCarrito, obtenerCarritoPorId, agregarProductoACarrito };

