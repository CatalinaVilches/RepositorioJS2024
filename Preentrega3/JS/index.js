const productos = [
    { tipo: "pasteles", nombre: "Pastel de Chocolate", precio: 9990 },
    { tipo: "pasteles", nombre: "Pastel de Fruta", precio: 7990 },
    { tipo: "pasteles", nombre: "Pastel Red Velvet", precio: 8490 },
    { tipo: "galletas", nombre: "Galletas Chips de Chocolate", precio: 1490 },
    { tipo: "galletas", nombre: "Galletas Chispas de Colores", precio: 1590 },
    { tipo: "galletas", nombre: "Galletas Sin Azúcar", precio: 1790 },
    { tipo: "cupcakes", nombre: "Cupcake Vainilla", precio: 1490 },
    { tipo: "cupcakes", nombre: "Cupcake Chocolate", precio: 1590 },
    { tipo: "cupcakes", nombre: "Cupcake Frutilla Sin Azúcar", precio: 1690 }
];

let cantidades = JSON.parse(localStorage.getItem('cantidades')) || {
    "Pastel de Chocolate": 0,
    "Pastel de Fruta": 0,
    "Pastel Red Velvet": 0,
    "Galletas Chips de Chocolate": 0,
    "Galletas Chispas de Colores": 0,
    "Galletas Sin Azúcar": 0,
    "Cupcake Vainilla": 0,
    "Cupcake Chocolate": 0,
    "Cupcake Frutilla Sin Azúcar": 0
};

function mostrarMenu() {
    const menu = document.getElementById('menu');
    menu.innerHTML = `
        <h2>Comprar Pasteles</h2>
        ${productos.filter(p => p.tipo === 'pasteles').map(p => 
            `<div class="product-item">
                ${p.nombre} - $${p.precio}
                <input type="number" id="cantidad-${p.nombre}" min="0" value="${cantidades[p.nombre]}">
                <button onclick="addToCart('${p.nombre}')">Añadir al carrito</button>
            </div>`
        ).join('')}
        <h2>Comprar Galletas</h2>
        ${productos.filter(p => p.tipo === 'galletas').map(p => 
            `<div class="product-item">
                ${p.nombre} - $${p.precio}
                <input type="number" id="cantidad-${p.nombre}" min="0" value="${cantidades[p.nombre]}">
                <button onclick="addToCart('${p.nombre}')">Añadir al carrito</button>
            </div>`
        ).join('')}
        <h2>Comprar Cupcakes</h2>
        ${productos.filter(p => p.tipo === 'cupcakes').map(p => 
            `<div class="product-item">
                ${p.nombre} - $${p.precio}
                <input type="number" id="cantidad-${p.nombre}" min="0" value="${cantidades[p.nombre]}">
                <button onclick="addToCart('${p.nombre}')">Añadir al carrito</button>
            </div>`
        ).join('')}
        <button id="finalizarCompra">Finalizar compra</button>
    `;

    document.getElementById('finalizarCompra').addEventListener('click', finalizarCompra);
}

function addToCart(nombre) {
    const cantidadInput = document.getElementById(`cantidad-${nombre}`);
    const cantidad = parseInt(cantidadInput.value, 10) || 0;
    if (cantidad >= 0) {
        cantidades[nombre] = cantidad;
        localStorage.setItem('cantidades', JSON.stringify(cantidades));
        mostrarProductos();
    }
}

function mostrarProductos() {
    const productosDiv = document.getElementById('products');
    productosDiv.innerHTML = `
        <h2>Carrito de Compras</h2>
        ${Object.keys(cantidades).filter(nombre => cantidades[nombre] > 0).map(nombre =>
            `<div class="product-item">
                ${nombre}: ${cantidades[nombre]} unidades
            </div>`
        ).join('')}
        <button onclick="vaciarCarrito()">Vaciar carrito</button>
    `;
}

function vaciarCarrito() {
    Object.keys(cantidades).forEach(nombre => cantidades[nombre] = 0);
   
    localStorage.setItem('cantidades', JSON.stringify(cantidades));

    mostrarProductos();
    mostrarMenu();
}

function calcularTotal() {
    return productos.reduce((total, producto) => {
        const cantidad = cantidades[producto.nombre] || 0;
        return total + cantidad * producto.precio;
    }, 0);
}

function finalizarCompra() {
    const totalCompra = calcularTotal();
    const checkoutDiv = document.getElementById('checkout');

    checkoutDiv.innerHTML = `
        <h2>Resumen de Compra</h2>
        <p>Total: $${totalCompra}</p>
        <p>¿Desea confirmar la compra?</p>
        <button onclick="confirmarCompra()">Sí</button>
        <button onclick="vaciarCarrito()">No</button>
    `;
}

function confirmarCompra() {
    const checkoutDiv = document.getElementById('checkout');
    checkoutDiv.innerHTML = `<p>Transacción realizada. ¡Gracias por su compra!</p>`;
}

mostrarMenu();
mostrarProductos();
