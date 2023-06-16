//VARIABLES GLOBALES
let ataqueJugador
let ataqueEnemigo
let vidasJugador = 3
let vidasEnemigo = 3

//LLAMANDO AL HTML MEDIANTE UN ID
const sectionAtaques = document.getElementById('section-ataques')
const sectionReset = document.getElementById('section-reset')
const btnReset = document.getElementById('btn-reset')
const selectPeleador = document.getElementById('btn-select-peleador')
const btnFisico = document.getElementById('btn-fisico')
const btnMagico = document.getElementById('btn-magico')
const btnEspecial = document.getElementById('btn-especial')

const seccionSeleccionarPeleador = document.getElementById('section-select-peleador')
const seccionSeleccionarAtaque = document.getElementById('section-ataques')
const scottCard = document.getElementById('scott')
const ramonaCard = document.getElementById('ramona')
const kimCard = document.getElementById('kim')
const spanPeleadorJugador = document.getElementById('peleador-jugador')
const spanPeleadorEnemigo = document.getElementById('peleador-enemigo')

const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')

const sectionMensajes = document.getElementById('resultado')
const divAtaquesJugador = document.getElementById('ataques-jugador')
const divAtaquesEnemigo = document.getElementById('ataques-enemigo')

//CLASE (PROGRAMACIÓN ORIENTADA A OBJETOS)
class Peleador {
    constructor(nombre, foto, vida) {
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
    }
}

//OBJETOS
let scott = new Peleador('Scott', '../assets/scott.gif', 3)
let ramona = new Peleador('Ramona', '../assets/ramona.gif', 3)
let kim = new Peleador('Kim', '../assets/kim.gif', 3)

// START GAME
function iniciarJuego() {
    sectionAtaques.style.display = 'none'

    sectionReset.style.display = 'none'

    btnReset.addEventListener('click', resetJuego)

    selectPeleador.addEventListener('click', seleccionarPeleadorJugador)

    btnFisico.addEventListener('click',ataqueFisico)
    btnMagico.addEventListener('click', ataqueMagico)
    btnEspecial.addEventListener('click', ataqueEspecial)
}

// DINAMICA DE ELECCION DE PELEADOR
function seleccionarPeleadorJugador() {
    seccionSeleccionarPeleador.style.display = 'none'

    seccionSeleccionarAtaque.style.display = 'flex'

    if (scottCard.checked) {
        spanPeleadorJugador.textContent = 'Scott Pilgrim'
    }
    else if (ramonaCard.checked) {
        spanPeleadorJugador.textContent = 'Ramona Flowers'
    }
    else if (kimCard.checked) {
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

    let nuevoAtaqueJugador = document.createElement('p')
    let nuevoAtaqueEnemigo = document.createElement('p')

    sectionMensajes.textContent = resultado
    nuevoAtaqueJugador.textContent = ataqueJugador
    nuevoAtaqueEnemigo.textContent = ataqueEnemigo

    divAtaquesJugador.appendChild(nuevoAtaqueJugador)
    divAtaquesEnemigo.appendChild(nuevoAtaqueEnemigo)
}

function indicadorVictoria(resultadoFinal) {

    sectionMensajes.textContent = resultadoFinal

    btnFisico.disabled = true
    btnMagico.disabled = true
    btnEspecial.disabled = true

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