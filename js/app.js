// Variables
const presupuestoUsuario = prompt('¿Cuál es tu presupuesto semanal?');
let cantidadPresupuesto;
const formulario = document.getElementById('agregar-gasto');



// Clases
class Presupuesto {
    constructor(presupuesto) {
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
    }

    presupuestoRestante(cantidad = 0) {
        return this.restante -= Number(cantidad);
    }
}

class Interfaz {
    insertarPresupuesto(cantidad) {
        const presupuestoSpan = document.getElementById('total');
        const restanteSpan = document.getElementById('restante');

        // Insertar al HTML
        presupuestoSpan.innerHTML = `${cantidad}`;
        restanteSpan.innerHTML = `${cantidad}`;
    }

    imprimirMensaje(mensaje, tipo) {
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert');

        if(tipo === 'error') {
            divMensaje.classList.add('alert-danger');
        } else {
            divMensaje.classList.add('alert-success');
        }

        divMensaje.appendChild(document.createTextNode(mensaje));

        // Insertar en el DOM
        document.querySelector('.primario').insertBefore(divMensaje, formulario);

        // Quitar alerta después de 3 segundos
        setTimeout(function(){
            document.querySelector('.primario .alert').remove();
            formulario.reset();
        }, 3000);
    }

    // Inserta los gastos a la lista
    agregarGastoListado(nombre, cantidad) {
        const gastosListado = document.querySelector('#gastos ul');

        // Creando LI para agregar gastos
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.innerHTML = `
            ${nombre}
           <span class="badge badge-primary badge-pill">$ ${cantidad}</span>
        `;
        gastosListado.appendChild(li);
    }

    // Comprueba presupuesto restante
    presupuestoRestante(cantidad) {
        const restante = document.querySelector('#restante');
        // Leemos el presupuesto restante
        const presupuestoRestanteUsuario =  cantidadPresupuesto.presupuestoRestante(cantidad);
        
        restante.innerHTML = `${presupuestoRestanteUsuario}`;

        this.comprobarPresupuesto();
    }

    // Cambiar color al presupuesto restante
    comprobarPresupuesto() {
        const presupuestoTotal = cantidadPresupuesto.presupuesto;
        const presupuestoRestante = cantidadPresupuesto.restante;

        // Comprobar el 25% del gasto
        if((presupuestoTotal / 4) > presupuestoRestante) {
            const restante = document.querySelector('.restante');
            restante.classList.remove('alert-success', 'alert-warning');
            restante.classList.add('alert-danger');
        } else if((presupuestoTotal / 2) > presupuestoRestante) {
            // Comprobar el 50% del gasto
            const restante = document.querySelector('.restante');
            restante.classList.remove('alert-success');
            restante.classList.add('alert-warning');
        }
        
    }
}


// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    if(presupuestoUsuario === null || presupuestoUsuario === '') {
        window.location.reload();        
    } else {
        // Instanciar presupuesto
        cantidadPresupuesto = new Presupuesto(presupuestoUsuario);
        const ui = new Interfaz();
        ui.insertarPresupuesto(cantidadPresupuesto.presupuesto);
    }

});

formulario.addEventListener('submit', function(e) {
    e.preventDefault();

    // Obteniendo valores de nombreGasto y cantidad
    const nombreGasto = document.getElementById('gasto').value;
    const cantidad = document.getElementById('cantidad').value;

    // Instancia de Interfaz
    const ui = new Interfaz();

    // Comprobando que los campos no vengan vacíos
    if(nombreGasto === '' || cantidad === '') {
        // 2 param mensaje y tipo
        ui.imprimirMensaje('Hubo un error', 'error');
    } else {
        ui.imprimirMensaje('Agregando...', 'correcto');
        ui.agregarGastoListado(nombreGasto, cantidad);
        ui.presupuestoRestante(cantidad);
    }
});