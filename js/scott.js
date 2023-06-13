//VARIABLES GLOBALES
let ataqueJugador
let ataqueEnemigo
let vidasJugador = 3
let vidasEnemigo = 3

// START GAME
function iniciarJuego() {
    let sectionAtaques = document.getElementById('section-ataques')
    sectionAtaques.style.display = 'none'

    let sectionReset = document.getElementById('section-reset')
    sectionReset.style.display = 'none'

    let btnReset = document.getElementById('btn-reset')
    btnReset.addEventListener('click', resetJuego)

    let selectPeleador = document.getElementById('btn-select-peleador')
    selectPeleador.addEventListener('click', seleccionarPeleadorJugador)

    let btnFisico = document.getElementById('btn-fisico')
    let btnMagico = document.getElementById('btn-magico')
    let btnEspecial = document.getElementById('btn-especial')
    btnFisico.addEventListener('click',ataqueFisico)
    btnMagico.addEventListener('click', ataqueMagico)
    btnEspecial.addEventListener('click', ataqueEspecial)
}

// DINAMICA DE ELECCION DE PELEADOR
function seleccionarPeleadorJugador() {
    let seccionSeleccionarPeleador = document.getElementById('section-select-peleador')
    seccionSeleccionarPeleador.style.display = 'none'

    let seccionSeleccionarAtaque = document.getElementById('section-ataques')
    seccionSeleccionarAtaque.style.display = 'flex'

    let scott = document.getElementById('scott')
    let ramona = document.getElementById('ramona')
    let kim = document.getElementById('kim')
    let spanPeleadorJugador = document.getElementById('peleador-jugador')

    if (scott.checked) {
        spanPeleadorJugador.textContent = 'Scott Pilgrim'
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

// DINAMICA DE SELECCION DE ATAQUES
function ataqueFisico() {
    ataqueJugador = 'Fisico'
    seleccionAtaqueEnemigo()
}
function ataqueMagico() {
    ataqueJugador = 'Magico'
    seleccionAtaqueEnemigo()
}
function ataqueEspecial() {
    ataqueJugador = 'Especial'
    seleccionAtaqueEnemigo()
}

function seleccionAtaqueEnemigo() {
    let ataqueAleatorio = numeroAleatorio(1, 3)

    if (ataqueAleatorio == 1) {
        ataqueEnemigo = 'Fisico'
    }
    else if (ataqueAleatorio == 2) {
        ataqueEnemigo = 'Magico'
    }
    else {
        ataqueEnemigo = 'Especial'
    }
    combate()
}

//MECANICA DE COMBATE
function combate() {
    let spanVidasJugador = document.getElementById('vidas-jugador')
    let spanVidasEnemigo = document.getElementById('vidas-enemigo')

    if (ataqueJugador == 'Fisico' && ataqueEnemigo == 'Especial' || ataqueJugador == 'Magico' && ataqueEnemigo == 'Fisico' || ataqueJugador == 'Especial' && ataqueEnemigo == 'Magico') {
        crearMensaje('¡Has Ganado!')
        vidasEnemigo --
        spanVidasEnemigo.textContent = vidasEnemigo
    }
    else if (ataqueJugador == ataqueEnemigo) {
        crearMensaje('¡Has empatado!')
    }
    else {
        crearMensaje('¡Has perdido!')
        vidasJugador --
        spanVidasJugador.textContent = vidasJugador
    }
    contadorVidas()
}

function contadorVidas() {
    if(vidasJugador == 0) {
        indicadorVictoria('¡Vaya lastima, has sido completamente ANIQUILADO!')
    }
    else if (vidasEnemigo == 0) {
        indicadorVictoria('¡En hora buena, has sido el ganador definitivo, FELICIDADES!')
    }
}

//ATAQUES USADOS E INDICADOR DE GANADOR
function crearMensaje(resultado) {
    let sectionMensajes = document.getElementById('resultado')
    let divAtaquesJugador = document.getElementById('ataques-jugador')
    let divAtaquesEnemigo = document.getElementById('ataques-enemigo')

    let nuevoAtaqueJugador = document.createElement('p')
    let nuevoAtaqueEnemigo = document.createElement('p')

    sectionMensajes.textContent = resultado
    nuevoAtaqueJugador.textContent = ataqueJugador
    nuevoAtaqueEnemigo.textContent = ataqueEnemigo

    divAtaquesJugador.appendChild(nuevoAtaqueJugador)
    divAtaquesEnemigo.appendChild(nuevoAtaqueEnemigo)
}

function indicadorVictoria(resultadoFinal) {
    let sectionMensajes = document.getElementById('resultado')

    sectionMensajes.textContent = resultadoFinal

    let btnFisico = document.getElementById('btn-fisico')
    btnFisico.disabled = true
    let btnMagico = document.getElementById('btn-magico')
    btnMagico.disabled = true
    let btnEspecial = document.getElementById('btn-especial')
    btnEspecial.disabled = true

    let sectionReset = document.getElementById('section-reset')
    sectionReset.style.display = 'block'
}
// RESET GAME
function resetJuego() {
    location.reload()
}

//FUNCIONES COMPLEMENTARIAS
function numeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min ++) + min)
}

window.addEventListener('load', iniciarJuego)