function CalcularAnualidad(deposito, al_iniciar, meses, interes){
    var monto = deposito;
    var desglose = [];
    var i = al_iniciar ? 1 : 2;
    if(!al_iniciar){
        desglose.push({mes: 1, interes_mes: 0, monto_mes: monto});
    }
    for(i; i <= meses; i++){
        var interes_m = (monto*interes);
        if(al_iniciar){
            monto += interes_m;
        }else{
            monto += interes_m + deposito;
        }
        var mes = {
            mes: i,
            interes_mes: interes_m,
            monto_mes:monto
        };
        desglose.push(mes);
        if(al_iniciar){
            monto += deposito;
        }
    }
    return desglose;
}
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
var botonAnualidad = document.getElementById('btn-anu');
botonAnualidad.onclick = function(){
    var deposito = parseFloat(document.getElementById("depo-anu").value);
    var al_iniciar = document.getElementById("ini-anu").checked;
    var meses = parseFloat(document.getElementById("mes-anu").value);
    var interes = parseFloat(document.getElementById("int-anu").value);
    ImprimeAnualidad(deposito, CalcularAnualidad(deposito,al_iniciar,meses,interes));
}