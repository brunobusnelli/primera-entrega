import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import exphbs from 'express-handlebars';
import path from 'path';
import { productos, generarId, agregarProducto, eliminarProducto } from './productos.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = 8080;
const HOST = 'localhost';

// Configuración de Handlebars
app.engine('.hbs', exphbs({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));

// Middleware para manejar archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para parsear body de peticiones
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Rutas
app.get('/products', (req, res) => {
    res.render('index', { productos });
});

app.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProductos', { productos });
});

// WebSocket para manejar eventos en tiempo real
io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado');

    socket.on('productoCreado', (producto) => {
        producto.id = generarId();
        agregarProducto(producto);
        io.emit('productoCreado', producto);
    });

    socket.on('productoEliminado', (idProducto) => {
        eliminarProducto(idProducto);
        io.emit('productoEliminado', idProducto);
    });

    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
});

// Manejo de rutas no encontradas
app.use('*', (req, res) => {
    res.status(404).send('<h1>Error 404</h1><p>Recurso no encontrado</p>');
});

// Iniciar servidor
server.listen(PORT, () => {
    console.log(`Servidor escuchando en http://${HOST}:${PORT}`);
});
