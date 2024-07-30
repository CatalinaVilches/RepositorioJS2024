alert("Bienvenido a Pastelería Dulces momentos");

const productos = {
    pastelChocolate: 9990,
    tortaFrutal: 7990,
    cupcakes: 1490
};

let cantidades = {
    pastelChocolate: 0,
    tortaFrutal: 0,
    cupcakes: 0
};

function mostrarMenu() {
    return prompt(
        "Elija una opción:\n" +
        "1) Comprar Pastel de Chocolate\n" +
        "2) Comprar Torta Frutal\n" +
        "3) Comprar Cupcakes\n" +
        "4) Ver precios\n" +
        "5) Finalizar compra"
    );
}

function mostrarPrecios() {
    let mensaje = "Precios:\n";
    for (let producto in productos) {
        
        let nombreProducto = producto.replace(/([A-Z])/g, ' $1');
        mensaje += `${nombreProducto.charAt(0).toUpperCase() + nombreProducto.slice(1)}: $${productos[producto]}\n`;
    }
    alert(mensaje);
}

function calcularTotal() {
    let total = 0;
    for (let producto in cantidades) {
        total += cantidades[producto] * productos[producto];
    }
    return total;
}


function calcularCuotas(total) {
    return {
        una: total,
        dos: total / 2,
        tres: total / 3,
        cuatro: (total * 1.1) / 4,
        cinco: (total * 1.1) / 5,
        seis: (total * 1.1) / 6
    };
}


function tiendaPasteleria() {
    let eleccion;
    do {
        eleccion = mostrarMenu();

        switch (eleccion) {
            case "1":
                cantidades.pastelChocolate = parseInt(prompt("¿Cuántos pasteles de chocolate desea comprar?")) || 0;
                break;
            case "2":
                cantidades.tortaFrutal = parseInt(prompt("¿Cuántas tortas frutales desea comprar?")) || 0;
                break;
            case "3":
                cantidades.cupcakes = parseInt(prompt("¿Cuántos cupcakes desea comprar?")) || 0;
                break;
            case "4":
                mostrarPrecios();
                break;
            case "5":
                break;
            default:
                alert("Opción inválida. Por favor, elija una opción válida.");
        }
    } while (eleccion !== "5");

    const totalCompra = calcularTotal();
    alert(`El total de su compra es: $${totalCompra}`);

    const cuotas = calcularCuotas(totalCompra);
    const respuestaCuotas = prompt("¿Desea pagar en cuotas? Hasta 3 cuotas sin recargo. Responda 'si' o 'no'.");

    if (respuestaCuotas.toLowerCase() === "si") {
        let cantidadCuotas = parseInt(
            prompt(
                `Cantidad:\n` +
                `1 Cuota de $${cuotas.una}\n` +
                `2 Cuotas de $${cuotas.dos}\n` +
                `3 Cuotas de $${cuotas.tres}\n` +
                `4 Cuotas de $${cuotas.cuatro.toFixed(0)} (10%+)\n` +
                `5 Cuotas de $${cuotas.cinco.toFixed(0)} (10%+)\n` +
                `6 Cuotas de $${cuotas.seis.toFixed(0)} (10%+)`
            )
        );
        alert("Transacción realizada. ¡Gracias por su compra!");
    } else {
        alert("Gracias por su compra.");
    }
}

tiendaPasteleria();