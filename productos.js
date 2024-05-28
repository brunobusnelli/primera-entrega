const productos = [
    {
        id: 1,
        title: "Producto 1",
        description: "Descripción del producto 1",
        code: "P001",
        price: "19.99",
        status: true,
        stock: 50,
        category: "Categoría 1",
        thumbnails: ["ruta1.jpg", "ruta2.jpg"]
    },
    {
        id: 2,
        title: "Producto 2",
        description: "Descripción del producto 2",
        code: "P002",
        price: "29.99",
        status: true,
        stock: 30,
        category: "Categoría 2",
        thumbnails: ["ruta3.jpg", "ruta4.jpg"]
    },
    {
        id: 3,
        title: "Producto 3",
        description: "Descripción del producto 3",
        code: "P003",
        price: "39.99",
        status: false,
        stock: 20,
        category: "Categoría 3",
        thumbnails: ["ruta5.jpg", "ruta6.jpg"]
    },
    {
        id: 4,
        title: "Producto 4",
        description: "Descripción del producto 4",
        code: "P004",
        price: "49.99",
        status: true,
        stock: 10,
        category: "Categoría 4",
        thumbnails: ["ruta7.jpg", "ruta8.jpg"]
    },
    {
        id: 5,
        title: "Producto 5",
        description: "Descripción del producto 5",
        code: "P005",
        price: "59.99",
        status: false,
        stock: 0,
        category: "Categoría 5",
        thumbnails: ["ruta9.jpg", "ruta10.jpg"]
    }
];


const generarId = () => {
    let mayorId = 0;

    productos.forEach((producto) => {
        if (producto.id > mayorId) {
            mayorId = producto.id;
        }
    });

    return mayorId + 1;
};

export { productos, generarId };