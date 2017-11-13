function CalculaRenta(capital, meses, interes){
    return (capital * interes) / (1-Math.pow((1+interes),-meses));
}
function CalcularAmortizacion(capital, meses, interes){
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
        amortizacion_acum = parseFloat(amortizacion_acum).toFixed(4);
        saldo_insoluto -= amortizacion;
        saldo_insoluto = parseFloat(saldo_insoluto).toFixed(4);
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
    return desglose;
}
ImprimeAmortizacion(CalcularAmortizacion(120000, 6, 0.05));

function ImprimeAmortizacion(desglose){
    var div = document.getElementById('tabla-amo');
    div.innerHTML = "<h3>Desglose de tabla | Amortización</h3>"
    var tabla = document.createElement('table');
    var encabezado = document.createElement('tr');
    encabezado.appendChild(document.createElement('th'));
    encabezado.appendChild(document.createElement('th'));
    encabezado.appendChild(document.createElement('th'));
    encabezado.appendChild(document.createElement('th'));
    encabezado.appendChild(document.createElement('th'));
    encabezado.appendChild(document.createElement('th'));
    encabezado.cells[0].appendChild(document.createTextNode('Pago'));
    encabezado.cells[1].appendChild(document.createTextNode('Renta'));
    encabezado.cells[2].appendChild(document.createTextNode('Intereses'));
    encabezado.cells[3].appendChild(document.createTextNode('Amortización'));
    encabezado.cells[4].appendChild(document.createTextNode('Amortización Acumulada'));
    encabezado.cells[5].appendChild(document.createTextNode('Saldo Insoluto'));
    tabla.appendChild(encabezado);
    
    console.log(tabla);
    desglose.forEach(mes => {
        var fila = document.createElement('tr');
        fila.appendChild(document.createElement('td'));
        fila.appendChild(document.createElement('td'));
        fila.appendChild(document.createElement('td'));
        fila.appendChild(document.createElement('td'));
        fila.appendChild(document.createElement('td'));
        fila.appendChild(document.createElement('td'));
        fila.cells[0].appendChild(document.createTextNode(mes.mes));
        fila.cells[1].appendChild(document.createTextNode(mes.renta));
        fila.cells[2].appendChild(document.createTextNode(mes.interes_ant));
        fila.cells[3].appendChild(document.createTextNode(mes.amortizacion));
        fila.cells[4].appendChild(document.createTextNode(mes.amortizacion_acum));
        fila.cells[5].appendChild(document.createTextNode(mes.saldo_insoluto));
        tabla.appendChild(fila);
        fila = document.createElement('tr');
    });
    div.appendChild(tabla);
}
var botonAmortizacion = document.getElementById('btn-amo');
botonAmortizacion.onclick = function(){
    var deposito = parseFloat(document.getElementById("depo-amo").value);
    var meses = parseFloat(document.getElementById("mes-amo").value);
    var interes = parseFloat(document.getElementById("int-amo").value);
    ImprimeAmortizacion(deposito, CalcularAmortizacion(deposito,meses,interes));
}