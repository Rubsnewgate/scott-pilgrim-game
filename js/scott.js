let ataqueJugador
let ataqueEnemigo

function iniciarJuego() {
    let btnJugador = document.getElementById('btn-peleador') //Esto es un metodo
    btnJugador.addEventListener('click', seleccionarPeleadorJugador)

    let btnFisico = document.getElementById('btn-fisico')
    btnFisico.addEventListener('click',ataqueFisico)
    let btnMagico = document.getElementById('btn-magico')
    btnMagico.addEventListener('click', ataqueMagico)
    let btnEspecial = document.getElementById('btn-especial')
    btnEspecial.addEventListener('click', ataqueEspecial)
}

function seleccionarPeleadorJugador() {
    let seleccion = document.getElementsByName('peleador')
    let spanPeleadorJugador = document.getElementById('peleador-jugador')

    if (scott.checked) {
        spanPeleadorJugador.textContent = 'Scott Pilgrim' //innerHTML - innerText. textContent vs XSS
    }
    else if (ramona.checked) {
        spanPeleadorJugador.textContent = 'Ramona Flowers'
    }
    else if (kim.checked) {
        spanPeleadorJugador.textContent = 'Kim Pines'
    }
    else {
        alert('Selecciona un peleador')
        return
    }
    seleccionarPeleadorEnemigo()
}

function numeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min ++) + min)
}

function seleccionarPeleadorEnemigo() {
    let peleadorAleatorio = numeroAleatorio(1, 3)
    let spanPeleadorEnemigo = document.getElementById('peleador-enemigo')
    if (peleadorAleatorio == 1) {
        spanPeleadorEnemigo.textContent = 'Scott Pilgrim'
    }
    else if (peleadorAleatorio == 2) {
        spanPeleadorEnemigo.textContent = 'Ramona Flowers'
    }
    else {
        spanPeleadorEnemigo.textContent = 'Kim Pines'
    }
}

function ataqueFisico() {
    ataqueJugador = 'Fisico'
    alert(ataqueJugador)
    seleccionAtaqueEnemigo()
}
function ataqueMagico() {
    ataqueJugador = 'Magico'
    alert(ataqueJugador)
    seleccionAtaqueEnemigo()
}
function ataqueEspecial() {
    ataqueJugador = 'Especial'
    alert(ataqueJugador)
    seleccionAtaqueEnemigo()
}

function seleccionAtaqueEnemigo() {
    let ataqueAleatorio = numeroAleatorio(1, 3)

    if (ataqueAleatorio == 1) {
        ataqueEnemigo = 'Fisico'
        alert('El enemigo ataca con ataque: ' + ataqueEnemigo)
    }
    else if (ataqueAleatorio == 2) {
        ataqueEnemigo = 'Magico'
        alert('El enemigo ataca con ataque: ' + ataqueEnemigo)
    }
    else {
        ataqueEnemigo = 'Especial'
        alert('El enemigo ataca con ataque: ' + ataqueEnemigo)
    }
}

window.addEventListener('load', iniciarJuego) // Window es un objeto, representa la ventana de un doc DOM