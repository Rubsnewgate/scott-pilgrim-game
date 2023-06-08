let ataqueJugador
let ataqueEnemigo
let vidasRestantesJugador = 3
let vidasRestatantesEnemigo = 3

function iniciarJuego() {
    let seccionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
    seccionSeleccionarAtaque.style.display = 'none'

    let seccionReset = document.getElementById('reset')
    seccionReset.style.display = 'none'

    let btnJugador = document.getElementById('btn-peleador') //Esto es un metodo
    btnJugador.addEventListener('click', seleccionarPeleadorJugador)

    let btnFisico = document.getElementById('btn-fisico')
    let btnMagico = document.getElementById('btn-magico')
    let btnEspecial = document.getElementById('btn-especial')
    btnFisico.addEventListener('click',ataqueFisico)
    btnMagico.addEventListener('click', ataqueMagico)
    btnEspecial.addEventListener('click', ataqueEspecial)

    let btnReset = document.getElementById('btn-reset')
    btnReset.addEventListener('click', resetJuego)
}

function seleccionarPeleadorJugador() {
    let seccionSeleccionarPeleador = document.getElementById('seleccionar-peleador')
    seccionSeleccionarPeleador.style.display = 'none'

    let seccionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
    seccionSeleccionarAtaque.style.display = 'flex'

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

function combate() {
    let vidasJugador = document.getElementById('vidas-jugador')
    let vidasEnemigo = document.getElementById('vidas-enemigo')

    if (ataqueJugador == 'Fisico' && ataqueEnemigo == 'Especial' || ataqueJugador == 'Magico' && ataqueEnemigo == 'Fisico' || ataqueJugador == 'Especial' && ataqueEnemigo == 'Magico') {
        indicadorAtaques('¡Has Ganado!')
        vidasRestatantesEnemigo --
        vidasEnemigo.textContent = vidasRestatantesEnemigo
    }
    else if (ataqueJugador == ataqueEnemigo) {
        indicadorAtaques('¡Has empatado!')
    }
    else {
        indicadorAtaques('¡Has perdido!')
        vidasRestantesJugador --
        vidasJugador.textContent = vidasRestantesJugador
    }
    contadorVidas()
}

function indicadorAtaques(resultado) {
    let sectionMensajes = document.getElementById('mensajes')
    let tipoAtaque = document.createElement('p')
    tipoAtaque.textContent = `Tu peleador atacó con ataque ${ataqueJugador}, el enemigo atacó con ataque ${ataqueEnemigo}, ${resultado}`
    sectionMensajes.appendChild(tipoAtaque)
}

function contadorVidas() {
    if(vidasRestantesJugador == 0) {
        indicadorVictoria('¡Vaya lastima, has sido completamente aniquilado!')
    }
    else if (vidasRestatantesEnemigo == 0) {
        indicadorVictoria('¡En hora buena, has sido el ganador definitivo, FELICIDADES!')
    }
}

function indicadorVictoria(resultadoFinal) {
    let sectionMensajes = document.getElementById('resultado')
    let resultadoJugador = document.getElementById('resultado-jugador')
    let resultadoEnemigo = document.getElementById('resultado-enemigo')

    let nuevoAtaqueJugador = document.createElement('p')
    let nuevoAtaqueEnemigo = document.createElement('p')

    sectionMensajes.textContent = resultadoFinal
    nuevoAtaqueJugador.textContent = ataqueJugador
    nuevoAtaqueEnemigo.textContent = ataqueEnemigo

    //let ganadorOrPerdedor = document.createElement('p')
    //ganadorOrPerdedor.textContent = resultadoFinal

    sectionMensajes.appendChild(resultado)
    resultadoJugador.appendChild(nuevoAtaqueJugador)
    resultadoEnemigo.appendChild(nuevoAtaqueEnemigo )

    let btnFisico = document.getElementById('btn-fisico')
    let btnMagico = document.getElementById('btn-magico')
    let btnEspecial = document.getElementById('btn-especial')

    btnFisico.disabled = true
    btnMagico.disabled = true
    btnEspecial.disabled = true

    let seccionReset = document.getElementById('reset')
    seccionReset.style.display = 'block'
}

function resetJuego() {
    location.reload()
}

function numeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min ++) + min)
}

window.addEventListener('load', iniciarJuego) // Window es un objeto, representa la ventana de un doc DOM