import express from "express";
import { productos, generarId } from "./productos.js";

const server = express();
const PORT = 8080;
const HOST = "localhost";

server.use(express.urlencoded({ extended: true }));
server.use(express.json());

// Obtener Productos
server.get('/api/productos', (req, res) => {
    res.status(200).send({ status: "success", payload: productos });
});

// Obtener Productos por ID
server.get('/api/productos/:pid', (req, res) => {
    const { pid } = req.params;
    const producto = productos.find((producto) => producto.id === Number(pid));

    if (!producto) {
        return res.status(404).send({ status: "error", message: "Producto no encontrado" });
    }

    return res.status(200).send({ status: "success", payload: producto });
});


// Agregar Producto
server.post('/api/productos', (req, res) => {
    const { title, description, code, price, status, stock, category, thumbnails } = req.body;

    if (!title || !description || !code || !price || status === undefined || !stock || !category || !thumbnails) {
        return res.status(400).send({ status: "error", message: "Datos incompletos" });
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

    productos.push(newProduct);

    return res.status(201).send({ status: "success", message: "El producto se ha creado", payload: newProduct });
});

// Actualizar Productos
server.put('/api/productos/:pid', (req, res) => {
    const { pid } = req.params;
    const { title, description, code, price, status, stock, category, thumbnails } = req.body;
    const indice = productos.findIndex((producto) => producto.id === Number(pid));

    if (indice < 0) {
        return res.status(404).send({ status: "error", message: "Producto no encontrado" });
    }

    if (!title || !description || !code || !price || status === undefined || !stock || !category || !thumbnails) {
        return res.status(400).send({ status: "error", message: "Datos incompletos" });
    }

    productos[indice] = { id: Number(pid), title, description, code, price, status, stock, category, thumbnails };

    return res.status(200).send({ status: "success", message: "El producto se ha modificado", payload: productos[indice] });
});

// Eliminar Productos
server.delete('/api/productos/:pid', (req, res) => {
    const { pid } = req.params;
    const indice = productos.findIndex((producto) => producto.id === Number(pid));

    if (indice < 0) {
        return res.status(404).send({ status: "error", message: "Producto no encontrado" });
    }

    productos.splice(indice, 1);

    return res.status(200).send({ status: "success", message: "El producto se ha eliminado" });
});

server.use("*", (req, res) => {
    return res.status(404).send("<h1>Error 404</h1><p>Recurso no encontrado</p>");
});

server.listen(PORT, () => {
    console.log(`Ejecutándose en http://${HOST}:${PORT}`);
});