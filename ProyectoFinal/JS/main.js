document.addEventListener('DOMContentLoaded', () => {
    let cantidades = JSON.parse(localStorage.getItem('cantidades')) || {};
    let productos = [];

    fetch('productos.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            productos = data; 
            data.forEach(p => {
                cantidades[p.nombre] = cantidades[p.nombre] || 0;
            });
            mostrarProductos(productos);
            mostrarMenu();
        })
        .catch(error => console.error('Error al cargar los productos:', error));

    function mostrarMenu() {
        const menu = document.getElementById('menu');
        menu.innerHTML = `
            <h2>Carrito de Compras</h2>
            ${Object.keys(cantidades).filter(nombre => cantidades[nombre] > 0).map(nombre =>
                `<div class="alert alert-info">
                    ${nombre}: ${cantidades[nombre]} unidades
                </div>`).join('')}
            <button class="btn btn-danger" onclick="vaciarCarrito()">Vaciar carrito</button>
            <button class="btn btn-success" id="finalizarCompra">Finalizar compra</button>
        `;
        document.getElementById('finalizarCompra').addEventListener('click', finalizarCompra);
    }

    function mostrarProductos(productos) {
        const categorias = ['pasteles', 'galletas', 'cupcakes'];
        categorias.forEach(tipo => {
            const contenedor = document.getElementById(tipo);
            contenedor.innerHTML = productos.filter(p => p.tipo === tipo).map(p => 
                `<div class="col-md-4">
                    <div class="card mb-4">
                        <div class="card-body">
                            <h5 class="card-title">${p.nombre}</h5>
                            <p class="card-text">$${p.precio} CLP</p>
                            <input type="number" id="cantidad-${p.nombre}" min="0" value="${cantidades[p.nombre]}">
                            <button class="btn btn-primary" onclick="addToCart('${p.nombre}', ${p.precio})">Añadir al carrito</button>
                        </div>
                    </div>
                </div>`).join('');
        });
    }

    window.addToCart = (nombre, precio) => {
        const cantidadInput = document.getElementById(`cantidad-${nombre}`);
        const cantidad = parseInt(cantidadInput.value, 10) || 0;
        if (cantidad >= 0) {
            cantidades[nombre] = cantidad;
            localStorage.setItem('cantidades', JSON.stringify(cantidades));
            mostrarMenu();
        }
    }

    window.vaciarCarrito = () => {
        Object.keys(cantidades).forEach(nombre => cantidades[nombre] = 0);
        localStorage.setItem('cantidades', JSON.stringify(cantidades));
        mostrarMenu();
    }

    function calcularTotal() {
        return Object.keys(cantidades).reduce((total, nombre) => {
            const producto = productos.find(p => p.nombre === nombre);
            return producto ? total + (cantidades[nombre] * producto.precio) : total;
        }, 0);
    }

    function finalizarCompra() {
        const totalCompra = calcularTotal();
        const checkoutDiv = document.getElementById('checkout');

        checkoutDiv.innerHTML = `
            <h2>Resumen de Compra</h2>
            <p>Total: $${totalCompra} CLP</p>
            <p>¿Desea confirmar la compra?</p>
            <button class="btn btn-success" onclick="confirmarCompra()">Sí</button>
            <button class="btn btn-secondary" onclick="vaciarCarrito()">No</button>
        `;
    }

    window.confirmarCompra = () => {
        document.getElementById('checkout').innerHTML = '<p>Transacción realizada. ¡Gracias por su compra!</p>';
        vaciarCarrito();
    }
});
