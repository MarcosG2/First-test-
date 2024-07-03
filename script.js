/*Nav-bar*/
const bar = document.getElementById('bar');
const nav = document.getElementById('navbar');
const close = document.getElementById('close');

if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    });
}

if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    });
}

/* cargando los productos  */
let productosEnLocalStorage = localStorage.getItem("productos-en-carrito");

let productosEnCarrito;
if (productosEnLocalStorage) {
    productosEnCarrito = JSON.parse(productosEnLocalStorage);
} else {
    productosEnCarrito = [];
}

const contenedorProductos = document.querySelector("#contenedor-productos");
let botonesAgregar = document.querySelectorAll(".product-add");

let produ = []; // Definimos produ en un alcance superior

function cargarProductos(productos) {
    produ = productos; // Asignamos productos a produ

    productos.forEach(element => {
        const div = document.createElement("div");
        div.classList.add("pro");
        div.innerHTML = `
            <img src="${element.img}" alt="">
            <div class="des">
                <span>${element.marca}</span>
                <h5>${element.nombre}</h5>
                <div class="star">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                </div>
                <h4>$${element.precio}</h4>
            </div>
            <div class="cart">
                <button class="product-add" id="${element.id}">
                    <i class="fa-solid fa-cart-shopping"></i>
                </button>
            </div>
        `;
        contenedorProductos.appendChild(div);
    });
    actualizarBotonesAgregar();
}

fetch('/html/productos.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        cargarProductos(data);
    })
    .catch(error => {
        console.error('Error al cargar productos:', error);
    });

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".product-add");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

function agregarAlCarrito(e) {
    const idBoton = e.currentTarget.id;
    const productoAgregado = produ.find(producto => producto.id === idBoton); // Usamos produ aquí

    if (productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}
