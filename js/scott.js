function iniciarJuego() {
    let btnJugador = document.getElementById('btn-peleador') //Esto es un metodo
    btnJugador.addEventListener('click', seleccionarPeleadorJugador)
}

function seleccionarPeleadorJugador() {
    let scott = document.getElementById('scott')
    let ramona = document.getElementById('ramona')
    let kim = document.getElementById('kim')

    if (scott.checked) {
        alert('Seleccionaste a scott')
    }
    else if (ramona.checked) {
        alert('Seleccionaste a ramona')
    }
    else if (kim.checked) {
        alert('Seleccionaste a kim')
    }
    else {
        alert('Selecciona un peleador')
    }
}

window.addEventListener('load', iniciarJuego)