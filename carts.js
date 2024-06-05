import fs from 'fs';
import path from 'path';

const __dirname = path.resolve();
const filePath = path.join(__dirname, 'carritos.json');

let carritos = [];

const loadCarritos = () => {
    if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath, 'utf-8');
        carritos = JSON.parse(data);
    }
};

const saveCarritos = () => {
    fs.writeFileSync(filePath, JSON.stringify(carritos, null, 2));
};

const generarIdCarrito = () => {
    let mayorId = 0;
    carritos.forEach(carrito => {
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
    saveCarritos();
    return nuevoCarrito;
};

const obtenerCarritoPorId = (cid) => {
    const carrito = carritos.find(carrito => carrito.id === Number(cid));
    return carrito || null;
};

const agregarProductoACarrito = (cid, pid) => {
    const carrito = carritos.find(carrito => carrito.id === Number(cid));
    if (!carrito) {
        return null;
    }

    const productoEnCarrito = carrito.products.find(producto => producto.product === pid);

    if (productoEnCarrito) {
        productoEnCarrito.quantity += 1;
    } else {
        carrito.products.push({ product: pid, quantity: 1 });
    }

    saveCarritos();
    return carrito;
};

loadCarritos();

export { carritos, crearCarrito, obtenerCarritoPorId, agregarProductoACarrito };
