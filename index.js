import express from "express";
const server = express();
const PORT = 8080;
const HOST = "localhost";


server.use(express.urlencoded({ extended: true }));
server.use(express.json());

const productsRouter = require('./routes/products');
app.use('/api/products', productsRouter);

server.listen(PORT, () => {
    console.log(`Ejecutandose en http://${HOST}:${PORT}`);
});
