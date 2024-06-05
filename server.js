import express from 'express';
import { productos, generarId, agregarProducto, actualizarProducto, eliminarProducto } from './productos.js';
import { carritos, crearCarrito, obtenerCarritoPorId, agregarProductoACarrito } from './carts.js';

const server = express();
const PORT = 8080;
const HOST = 'localhost';

server.use(express.urlencoded({ extended: true }));
server.use(express.json());

// Rutas para productos
server.get('/api/productos', (req, res) => {
    res.status(200).send({ status: 'success', payload: productos });
});

server.get('/api/productos/:pid', (req, res) => {
    const { pid } = req.params;
    const producto = productos.find((producto) => producto.id === Number(pid));

    if (!producto) {
        return res.status(404).send({ status: 'error', message: 'Producto no encontrado' });
    }

    return res.status(200).send({ status: 'success', payload: producto });
});

server.post('/api/productos', (req, res) => {
    const { title, description, code, price, status, stock, category, thumbnails } = req.body;

    if (!title || !description || !code || !price || status === undefined || !stock || !category || !thumbnails) {
        return res.status(400).send({ status: 'error', message: 'Datos incompletos' });
    }

    const newProduct = {
        id: generarId(),
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnails
    };

    agregarProducto(newProduct);

    return res.status(201).send({ status: 'success', message: 'El producto se ha creado', payload: newProduct });
});

server.put('/api/productos/:pid', (req, res) => {
    const { pid } = req.params;
    const { title, description, code, price, status, stock, category, thumbnails } = req.body;

    const producto = productos.find(producto => producto.id === Number(pid));

    if (!producto) {
        return res.status(404).send({ status: 'error', message: 'Producto no encontrado' });
    }

    actualizarProducto(Number(pid), { title, description, code, price, status, stock, category, thumbnails });

    return res.status(200).send({ status: 'success', message: 'El producto se ha modificado' });
});

server.delete('/api/productos/:pid', (req, res) => {
    const { pid } = req.params;

    const producto = productos.find(producto => producto.id === Number(pid));

    if (!producto) {
        return res.status(404).send({ status: 'error', message: 'Producto no encontrado' });
    }

    eliminarProducto(Number(pid));

    return res.status(200).send({ status: 'success', message: 'El producto se ha eliminado' });
});

// Rutas para carritos
server.post('/api/carts', (req, res) => {
    const nuevoCarrito = crearCarrito();
    return res.status(201).send({ status: 'success', message: 'Carrito creado', payload: nuevoCarrito });
});

server.get('/api/carts/:cid', (req, res) => {
    const { cid } = req.params;
    const carrito = obtenerCarritoPorId(cid);

    if (!carrito) {
        return res.status(404).send({ status: 'error', message: 'Carrito no encontrado' });
    }

    return res.status(200).send({ status: 'success', payload: carrito.products });
});

server.post('/api/carts/:cid/product/:pid', (req, res) => {
    const { cid, pid } = req.params;
    const carritoActualizado = agregarProductoACarrito(cid, Number(pid));

    if (!carritoActualizado) {
        return res.status(404).send({ status: 'error', message: 'Carrito no encontrado' });
    }

    return res.status(200).send({ status: 'success', message: 'Producto agregado al carrito', payload: carritoActualizado });
});

// Método que responde a las URL inexistentes
server.use('*', (req, res) => {
    return res.status(404).send('<h1>Error 404</h1><p>Recurso no encontrado</p>');
});

// Método oyente de solicitudes
server.listen(PORT, () => {
    console.log(`Ejecutándose en http://${HOST}:${PORT}`);
});
