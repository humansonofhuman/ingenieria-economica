function CalculaRenta(capital, meses, interes){
    return (capital * interes) / (1-Math.pow((1+interes),-meses));
}
function CalcularAmortizacion(capital, al_iniciar, meses, interes){
    var renta = CalculaRenta(capital, meses, interes).toFixed(4);
    var interes_ant = 0;
    var amortizacion = 0;
    var amortizacion_acum = 0;
    var saldo_insoluto = capital;
    var desglose = [];
    var mes = {
        mes: 0,
        renta: 0,
        interes_ant: 0,
        amortizacion: 0,
        amortizacion_acum: 0,
        saldo_insoluto: capital
    };
    desglose.push(mes);
    for (let index = 1; index <= meses; index++) {
        interes_ant = (saldo_insoluto*interes).toFixed(4);
        amortizacion = (renta - interes_ant).toFixed(4);
        amortizacion_acum += amortizacion;
        saldo_insoluto-=amortizacion;
        mes = {
            mes: index,
            renta: renta,
            interes_ant: interes_ant,
            amortizacion: amortizacion,
            amortizacion_acum: amortizacion_acum,
            saldo_insoluto: saldo_insoluto
        };
        desglose.push(mes);
    }
    console.log(desglose);
}
CalcularAmortizacion(120000, 1, 6, 0.05);

function ImprimeAnualidad(deposito, desglose){
    var div = document.getElementById('tabla-anu');
    div.innerHTML = "<h3>Desglose de tabla | Anualidad</h3>"
    var tabla = document.createElement('table');
    var encabezado = document.createElement('tr');
    encabezado.appendChild(document.createElement('th'));
    encabezado.appendChild(document.createElement('th'));
    encabezado.cells[0].appendChild(document.createTextNode('Concepto'));
    encabezado.cells[1].appendChild(document.createTextNode('Cantidad'));
    tabla.appendChild(encabezado);

    console.log(tabla);
    desglose.forEach(mes => {
        var fila = document.createElement('tr');
        fila.appendChild(document.createElement('td'));
        fila.appendChild(document.createElement('td'));
        fila.cells[0].appendChild(document.createTextNode("Interés del mes "+mes.mes));
        fila.cells[1].appendChild(document.createTextNode(mes.interes_mes));
        tabla.appendChild(fila);
        fila = document.createElement('tr');
        fila.appendChild(document.createElement('td'));
        fila.appendChild(document.createElement('td'));
        fila.cells[0].appendChild(document.createTextNode("Deposito del mes "+mes.mes));
        fila.cells[1].appendChild(document.createTextNode(deposito));
        tabla.appendChild(fila);
        fila = document.createElement('tr');
        fila.appendChild(document.createElement('td'));
        fila.appendChild(document.createElement('td'));
        fila.cells[0].appendChild(document.createTextNode("Monto al mes "+mes.mes));
        fila.cells[1].appendChild(document.createTextNode(mes.monto_mes));
        tabla.appendChild(fila);
        console.log("Interés del mes "+mes.mes +"    "+ mes.interes_mes);
        console.log("Deposito del mes "+mes.mes +"   "+ deposito);
        console.log("Monto al mes "+mes.mes +"       "+ mes.monto_mes);
    });
    div.appendChild(tabla);
}