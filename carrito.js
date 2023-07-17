/*Nav-bar*/
const bar = document.getElementById('bar');
const nav = document.getElementById('navbar');
const close = document.getElementById('close');

if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active')
    })
}

if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active')
    })
}

/** Proceso de compra*/

let productosEnCarrito = localStorage.getItem("productos-en-carrito");
productosEnCarrito = JSON.parse(productosEnCarrito);

const contenedorCarritoVacio = document.querySelector("#cart-vacio");
const tbody = document.querySelector("#contenedorCarrito");
const carritoVacio = document.querySelector(".cart-empty")
let botonesElimnar = document.querySelectorAll(".carrito-producto-eliminar");
const sumaC = document.querySelector(".cart-total");
const precioFinal = document.querySelector(".total");




function cargarProductosCarrito() {
    let html = '';
    if (productosEnCarrito && productosEnCarrito.length >0) {
        
        productosEnCarrito.forEach(element => {
            html += '<tr>';
            html += '<td>' + '<button class="carrito-producto-eliminar" id="' + element.id + '" ><i class="far fa-times-circle" >' + '</i></button>' + '</td>'
            html += '<td>' + '<img src="' + element.img + '" alt="">' + '</td>'
            html += '<td>' + element.nombre + '</td>'
            html += '<td>$' + element.precio + '</td>'
            html += '<td>' + element.cantidad + '</td>'
            html += '<td>' + element.cantidad * element.precio + '</td>'
            html += '</tr>';

        });
        tbody.innerHTML = html;
        
    }else{
        html += '<tr>';
        html += '<td colspan="6">';
        html += "<p> Your cart is empty.</p>"
        html += '</td>'
        html += '</tr>';
        tbody.innerHTML = html;

    }
    actualizarBotonesEliminar();
    SubTotal();

}





function actualizarBotonesEliminar() {
    botonesElimnar = document.querySelectorAll(".carrito-producto-eliminar");

    botonesElimnar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });
}

function eliminarDelCarrito(e){
    const idBoton = e.currentTarget.id;
    const index= productosEnCarrito.findIndex(producto => producto.id === idBoton);
    productosEnCarrito.splice(index,1);
    cargarProductosCarrito();


    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}



function SubTotal(){
    let contenedorDePrecios=0;
    if (productosEnCarrito){
        productosEnCarrito.forEach(function(producto) {
            contenedorDePrecios += producto.cantidad * producto.precio;
        })
    }
    sumaC.innerHTML='$ '+contenedorDePrecios;
    precioFinal.innerHTML='$ '+contenedorDePrecios;
}

var botonComprar = document.getElementById('boton-comprar');
var overlay = document.getElementById('overlay');
let mensaje = document.getElementById('user-message');
let botonFinalizarCompra = document.getElementById('boton-finalizar');

botonFinalizarCompra.addEventListener('click', function () {
        let html = '';
        html += '<tr>';
        html += '<td colspan="6">';
        html += "<p> Your cart is empty.</p>"
        html += '</td>'
        html += '</tr>';
        tbody.innerHTML = html;
        
})

botonComprar.addEventListener('click', function() {
    overlay.style.display = 'block';
    if (productosEnCarrito){
        
        mensaje.innerHTML=`Your purchase was successful.`;
    }else{
        mensaje.innerHTML=`Your purchase could not be completed because you have no items in your cart.`;
    }
    
});

const botonCupon = document.getElementById('Aplicupon');
let ventanaModal = document.getElementById('ventanaModal');
let cerrarModal = document.getElementsByClassName('cerrar')[0];
let mensajeCupon = document.getElementById('Mensaje-cupon');
let cupon = document.getElementById('Cupon');
let casillaDelCupon = document.querySelector('.textoDeCupon');

botonCupon.addEventListener('click', function() {
    let texto = document.getElementById('miInput').value;
    let textoMay = texto.toUpperCase();
    let textoCupon ;
    let numeroConSimbolo;
    let cuponAplicad=0;
    if (textoMay==="RAISE"){
        ventanaModal.style.display = 'block';
        mensajeCupon.innerHTML=`Discount applied.`;
        cupon.style.display = 'contents';
        textoCupon= precioFinal.innerHTML;
        numeroConSimbolo = textoCupon.replace('$', '').trim();
        cuponAplicad = parseInt(numeroConSimbolo);
        let descuent = cuponAplicad*0.2;
        casillaDelCupon.innerHTML =`$`+ descuent;
        precioFinal.innerHTML=`$`+aplicarDescuento(cuponAplicad);
        
    }

})

cerrarModal.addEventListener('click', function() {
    ventanaModal.style.display = 'none';
});

function aplicarDescuento(numero) {
    var descuento = numero * 0.2;  
    var resultado = numero - descuento;  
    return resultado;
}



cargarProductosCarrito();



