alert("Bienvenido a Pastelería Dulces Momentos");

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


let cantidades = {
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

function mostrarMenu(opciones) {
    return prompt(
        opciones.map((opcion, index) => `${index + 1}) ${opcion}`).join("\n")
    );
}

function mostrarPrecios() {
    const mensaje = productos.map(producto => 
        `${producto.nombre}: $${producto.precio}`).join("\n");
    alert(`Precios:\n${mensaje}`);
}

function calcularTotal() {
    return productos.reduce((total, producto) => {
        const cantidad = cantidades[producto.nombre] || 0;
        return total + cantidad * producto.precio;
    }, 0);
}

function calcularCuotas(total) {
    const cuotas = {};
    for (let i = 1; i <= 6; i++) {
        cuotas[i] = i <= 3 ? total / i : (total * 1.1) / i;
    }
    return cuotas;
}

function tiendaPasteleria() {
    const menuPrincipalOpciones = [
        "Comprar Pasteles",
        "Comprar Galletas",
        "Comprar Cupcakes",
        "Ver precios",
        "Finalizar compra"
    ];

    let eleccion;
    do {
        eleccion = mostrarMenu(menuPrincipalOpciones);

        switch (eleccion) {
            case "1":
                const pastelesOpciones = [
                    "Pastel de Chocolate", 
                    "Pastel de Fruta", 
                    "Pastel Red Velvet", 
                    "Volver al menú principal"
                ];
                const eleccionPasteles = mostrarMenu(pastelesOpciones);
                if (eleccionPasteles >= "1" && eleccionPasteles <= "3") {
                    const pastel = pastelesOpciones[eleccionPasteles - 1];
                    cantidades[pastel] += parseInt(prompt(`¿Cuántos ${pastel} desea comprar?`)) || 0;
                }
                break;
            case "2":
                const galletasOpciones = [
                    "Galletas Chips de Chocolate", 
                    "Galletas Chispas de Colores", 
                    "Galletas Sin Azúcar", 
                    "Volver al menú principal"
                ];
                const eleccionGalletas = mostrarMenu(galletasOpciones);
                if (eleccionGalletas >= "1" && eleccionGalletas <= "3") {
                    const galleta = galletasOpciones[eleccionGalletas - 1];
                    cantidades[galleta] += parseInt(prompt(`¿Cuántas ${galleta} desea comprar?`)) || 0;
                }
                break;
            case "3":
                const cupcakesOpciones = [
                    "Cupcake Vainilla", 
                    "Cupcake Chocolate", 
                    "Cupcake Frutilla Sin Azúcar", 
                    "Volver al menú principal"
                ];
                const eleccionCupcakes = mostrarMenu(cupcakesOpciones);
                if (eleccionCupcakes >= "1" && eleccionCupcakes <= "3") {
                    const cupcake = cupcakesOpciones[eleccionCupcakes - 1];
                    cantidades[cupcake] += parseInt(prompt(`¿Cuántos ${cupcake} desea comprar?`)) || 0;
                }
                break;
            case "4":
                mostrarPrecios();
                break;
            case "5":
                const totalCompra = calcularTotal();
                alert(`El total de su compra es: $${totalCompra}`);
                
                const deseaCuotas = prompt("¿Desea pagar en cuotas? (si/no)");

                if (deseaCuotas.toLowerCase() === "si") {
                    const cuotas = calcularCuotas(totalCompra);
                    const cantidadCuotas = parseInt(prompt(
                        `¿En cuántas cuotas desea pagar?\n` +
                        `1 Cuota de $${cuotas[1].toFixed(0)}\n` +
                        `2 Cuotas de $${cuotas[2].toFixed(0)}\n` +
                        `3 Cuotas de $${cuotas[3].toFixed(0)}\n` +
                        `4 Cuotas de $${cuotas[4].toFixed(0)} (10%+)\n` +
                        `5 Cuotas de $${cuotas[5].toFixed(0)} (10%+)\n` +
                        `6 Cuotas de $${cuotas[6].toFixed(0)} (10%+)\n` +
                        `Ingrese la cantidad de cuotas (1-6):`
                    ));

                    if (cantidadCuotas >= 1 && cantidadCuotas <= 6) {
                        alert("Transacción realizada. ¡Gracias por su compra!");
                    } else {
                        alert("Cantidad de cuotas inválida. Transacción cancelada.");
                    }
                } else if (deseaCuotas.toLowerCase() === "no") {
                    alert("Transacción realizada. ¡Gracias por su compra!");
                } else {
                    alert("Opción inválida. Transacción cancelada.");
                }
                break;
            default:
                alert("Opción inválida. Por favor, elija una opción válida.");
        }
    } while (eleccion !== "5");
}

tiendaPasteleria();
