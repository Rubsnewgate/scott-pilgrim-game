//SELECT FIGHTER SECTION
const playerSelectionSection = document.querySelector('.select-fighter')
const fighterCardsContainer = document.querySelector('.select-fighter__cards')
const selectFighterBtn = document.querySelector('.select-fighter__btn')

// CANVAS MAP SECTION
const mapSection = document.querySelector('.game-canvas')
const gameMap = document.querySelector('.game-canvas__map')

// SELECT ATTACKS SECTION
const attackSelectionSection = document.querySelector('.select-attacks')
const attackContainer = document.querySelector('.select-attacks__container')
const messageSection = document.querySelector('.select-attacks__resultado')
const restartSection = document.querySelector('.select-attacks__reset')
const restartBtn = document.querySelector('.select-attacks__reset--btn')

const thumbnailImagePlayer1 = document.querySelector('.thumbnail--player1')
const player1NameIndicator = document.querySelector('.counter__name--player1')
const player1WinsIndicator = document.querySelector('.counter__victories--player1')
const player1AttackIndicator = document.querySelector('.counter__attacks--player1')

const thumbnailImagePlayer2 = document.querySelector('.thumbnail--player2')
const player2NameIndicator = document.querySelector('.counter__name--player2')
const player2WinsIndicator = document.querySelector('.counter__victories--player2')
const player2AttackIndicator = document.querySelector('.counter__attacks--player2')

// VARIABLES IN ORDER OF APPEARANCE WITHIN THE f()
let fighters = []
let player1Attack = []
let player2Attack = []

let fighterCards
let scottCard
let ramonaCard
let kimCard
let lucasCard
let toddCard
let roxieCard

let player1Fighter
let player1AttackBtns
let player2AttackBtns
let physicalAttackBtn
let magicAttackBtn
let specialAttackBtn
let btns = []

let player1AttackIndex
let player2AttackIndex
let player1Wins = 0
let player2Wins = 0

// VARIABLES OF THE CANVAS
let canvas = gameMap.getContext('2d')
let interval
let fighterInCanvas
let mapBackgroundImage = new Image()
mapBackgroundImage.src = '../assets/img/bg.jpg'

// FIGHTER CONSTRUCTOR
class Fighter {
    // Cuando el valor de una propiedad de un objeto es una función se le llama: método.
    // El método, entonces, es una función que está asociada a un objeto.
    constructor(name, picture, lives, mapPicture) {
        this.name = name
        this.picture = picture
        this.lives = lives
        this.attacks = []
        // Atributos del peleador en el canvas
        this.width = 50
        this.height = 50
        this.x = randomNumber(0, gameMap.width - this.width)
        this.y = randomNumber(0, gameMap.height - this.height)
        this.pictureInCanvas = new Image()
        this.pictureInCanvas.src = mapPicture
        this.speedInX = 0
        this.speedInY = 0
    }
    printFighter() {
        canvas.drawImage(
            this.pictureInCanvas,
            this.x,
            this.y,
            this.width,
            this.height
        )
    }
}

// FIGHTER CREATION
let scott = new Fighter('Scott', '../assets/img/scott.gif', 5, '../assets/canvas-img/scott-map.jpg')
let ramona = new Fighter('Ramona', '../assets/img/ramona.gif', 5, '../assets/canvas-img/ramona-map.jpg')
let kim = new Fighter('Kim', '../assets/img/kim.gif', 5, '../assets/canvas-img/kim-map.jpg')
let lucas = new Fighter('Lucas', '../assets/img/lucas.gif', 5, '../assets/canvas-img/lucas-map.jpg')
let todd = new Fighter('Todd', '../assets/img/todd.gif', 5, '../assets/canvas-img/todd-map.jpg')
let roxie = new Fighter('Roxie', '../assets/img/roxie.gif', 5, '../assets/canvas-img/roxie-map.jpg')

let playerTwoScott = new Fighter('Scott', '../assets/img/scott.gif', 5, '../assets/canvas-img/scott-map.jpg')
let playerTwoRamona = new Fighter('Ramona', '../assets/img/ramona.gif', 5, '../assets/canvas-img/ramona-map.jpg')
let playerTwoKim = new Fighter('Kim', '../assets/img/kim.gif', 5, '../assets/canvas-img/kim-map.jpg')
let playerTwoLucas = new Fighter('Lucas', '../assets/img/lucas.gif', 5, '../assets/canvas-img/lucas-map.jpg')
let playerTwoTodd = new Fighter('Todd', '../assets/img/todd.gif', 5, '../assets/canvas-img/todd-map.jpg')
let playerTwoRoxie = new Fighter('Roxie', '../assets/img/roxie.gif', 5, '../assets/canvas-img/roxie-map.jpg')

fighters.push(scott, ramona, kim, lucas, todd, roxie)

// FIGHTER ATTACKS
scott.attacks.push(
    {name: 'Physical! 🥊', id: 'btn-physical'},
    {name: 'Physical! 🥊', id: 'btn-physical'},
    {name: 'Physical! 🥊', id: 'btn-physical'},
    {name: 'Magic! ✨', id: 'btn-magic'},
    {name: 'Special! 🔮', id: 'btn-special'}
)
ramona.attacks.push(
    {name: 'Magic! ✨', id: 'btn-magic'},
    {name: 'Magic! ✨', id: 'btn-magic'},
    {name: 'Magic! ✨', id: 'btn-magic'},
    {name: 'Physical! 🥊', id: 'btn-physical'},
    {name: 'Special! 🔮', id: 'btn-special'}
)
kim.attacks.push(
    {name: 'Special! 🔮', id: 'btn-special'},
    {name: 'Special! 🔮', id: 'btn-special'},
    {name: 'Special! 🔮', id: 'btn-special'},
    {name: 'Physical! 🥊', id: 'btn-physical'},
    {name: 'Magic! ✨', id: 'btn-magic'}
)
lucas.attacks.push(
    {name: 'Physical! 🥊', id: 'btn-physical'},
    {name: 'Physical! 🥊', id: 'btn-physical'},
    {name: 'Physical! 🥊', id: 'btn-physical'},
    {name: 'Magic! ✨', id: 'btn-magic'},
    {name: 'Special! 🔮', id: 'btn-special'}
)
todd.attacks.push(
    {name: 'Magic! ✨', id: 'btn-magic'},
    {name: 'Magic! ✨', id: 'btn-magic'},
    {name: 'Magic! ✨', id: 'btn-magic'},
    {name: 'Physical! 🥊', id: 'btn-physical'},
    {name: 'Special! 🔮', id: 'btn-special'}
)
roxie.attacks.push(
    {name: 'Special! 🔮', id: 'btn-special'},
    {name: 'Special! 🔮', id: 'btn-special'},
    {name: 'Special! 🔮', id: 'btn-special'},
    {name: 'Physical! 🥊', id: 'btn-physical'},
    {name: 'Magic! ✨', id: 'btn-magic'}
)

playerTwoScott.attacks.push(
    {name: 'Physical! 🥊', id: 'btn-physical'},
    {name: 'Physical! 🥊', id: 'btn-physical'},
    {name: 'Physical! 🥊', id: 'btn-physical'},
    {name: 'Magic! ✨', id: 'btn-magic'},
    {name: 'Special! 🔮', id: 'btn-special'}
)
playerTwoRamona.attacks.push(
    {name: 'Magic! ✨', id: 'btn-magic'},
    {name: 'Magic! ✨', id: 'btn-magic'},
    {name: 'Magic! ✨', id: 'btn-magic'},
    {name: 'Physical! 🥊', id: 'btn-physical'},
    {name: 'Special! 🔮', id: 'btn-special'}
)
playerTwoKim.attacks.push(
    {name: 'Special! 🔮', id: 'btn-special'},
    {name: 'Special! 🔮', id: 'btn-special'},
    {name: 'Special! 🔮', id: 'btn-special'},
    {name: 'Physical! 🥊', id: 'btn-physical'},
    {name: 'Magic! ✨', id: 'btn-magic'}
)
playerTwoLucas.attacks.push(
    {name: 'Physical! 🥊', id: 'btn-physical'},
    {name: 'Physical! 🥊', id: 'btn-physical'},
    {name: 'Physical! 🥊', id: 'btn-physical'},
    {name: 'Magic! ✨', id: 'btn-magic'},
    {name: 'Special! 🔮', id: 'btn-special'}
)
playerTwoTodd.attacks.push(
    {name: 'Magic! ✨', id: 'btn-magic'},
    {name: 'Magic! ✨', id: 'btn-magic'},
    {name: 'Magic! ✨', id: 'btn-magic'},
    {name: 'Physical! 🥊', id: 'btn-physical'},
    {name: 'Special! 🔮', id: 'btn-special'}
)
playerTwoRoxie.attacks.push(
    {name: 'Special! 🔮', id: 'btn-special'},
    {name: 'Special! 🔮', id: 'btn-special'},
    {name: 'Special! 🔮', id: 'btn-special'},
    {name: 'Physical! 🥊', id: 'btn-physical'},
    {name: 'Magic! ✨', id: 'btn-magic'}
)

// START GAME FUNCTION
function startGame() {
    // Hiding the attack selection, the canvas and the game reset's section
    attackSelectionSection.style.display = 'none'
    mapSection.style.display = 'none'
    restartSection.style.display = 'none'

    // Creating a selection card for every fighter
    fighters.forEach((fighter) => {
        fighterCards = `
        <input type="radio" name="peleador" id=${fighter.name}>
        <label class="select-fighter__cards--info" for=${fighter.name}>
            <img src="${fighter.picture}" alt="${fighter.name}">
            <p>${fighter.name}</p>
        </label>
        `
        fighterCardsContainer.innerHTML += fighterCards

        scottCard = document.getElementById('Scott')
        ramonaCard = document.getElementById('Ramona')
        kimCard = document.getElementById('Kim')
        lucasCard = document.getElementById('Lucas')
        toddCard = document.getElementById('Todd')
        roxieCard = document.getElementById('Roxie')
    })
    // Button to select player one's fighter
    selectFighterBtn.addEventListener('click', player1FighterChoise)
    // Game restart button
    restartBtn.addEventListener('click', restartGame)
}

// PLAYER 1 FIGHTER CHOISE
function player1FighterChoise() {
    // Hiding the fighter selection section
    playerSelectionSection.style.display = 'none'

    // Displaying player 1's fighter on the screen with all their characteristics
    if (scottCard.checked) {
        player1NameIndicator.innerHTML = scottCard.id
        player1Fighter = scottCard.id
        thumbnailImagePlayer1.src = scott.picture
    }
    else if (ramonaCard.checked) {
        player1NameIndicator.innerHTML = ramonaCard.id
        player1Fighter = ramonaCard.id
        thumbnailImagePlayer1.src = ramona.picture
    }
    else if (kimCard.checked) {
        player1NameIndicator.innerHTML = kimCard.id
        player1Fighter = kimCard.id
        thumbnailImagePlayer1.src = kim.picture
    }
    else if (lucasCard.checked) {
        player1NameIndicator.innerHTML = lucasCard.id
        player1Fighter = lucasCard.id
        thumbnailImagePlayer1.src = lucas.picture
    }
    else if (toddCard.checked) {
        player1NameIndicator.innerHTML = toddCard.id
        player1Fighter = toddCard.id
        thumbnailImagePlayer1.src = todd.picture
    }
    else if (roxieCard.checked) {
        player1NameIndicator.innerHTML = roxieCard.id
        player1Fighter = roxieCard.id
        thumbnailImagePlayer1.src = roxie.picture
    }
    else {
        alert("Select a fighter!")
        attackSelectionSection.style.display = 'none'
        playerSelectionSection.style.display = 'flex'
    }
    // Displaying the canvas section
    mapSection.style.display = 'flex'
    // Mini game: find your opponent on the canvas to start the battle.
    startMapMiniGame()

    extractAttacks(player1Fighter)
}

// ATTACK EXTRACTION FUNCTION
function extractAttacks(player1Fighter) {
    /*
        We iterate through our 'fighters' array to find the fighter chosen by Player 1,
        then extract the attacks of Player 1's fighter and display them as the attack buttons.
    */
    let attacks
    for (let i = 0; i < fighters.length; i++) {
        if (player1Fighter === fighters[i].name) {
            attacks = fighters[i].attacks
        }
    }
    displayTheAttackButtons(attacks)
}

// DISPLAYING THE ATTACK SELECTION BUTTONS ON THE SECREEN
function displayTheAttackButtons(attacks) {
    // Iterating through each attack to obtain its respective button
    attacks.forEach((attack) => {
        // Generating buttons for each different attack of Player 1's fighter
        player1AttackBtns = `<button id=${attack.id} class="btn attack__btn">${attack.name}</button>`

        // Adding each attack button to our attack container in HTML
        attackContainer.innerHTML += player1AttackBtns
    })

    physicalAttackBtn = document.getElementById('btn-physical')
    magicAttackBtn = document.getElementById('btn-magic')
    specialAttackBtn = document.getElementById('btn-special')
    btns = document.querySelectorAll('.attack__btn')
}

// SEQUENCE OF ATTACKS
function attackSequence() {
    // Generating the attack sequence for Player 1
    btns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            if (e.target.textContent === 'Physical! 🥊') {
                player1Attack.push('🥊')
                console.log(player1Attack)
                btn.style.background = 'crimson'
                btn.disabled = true
            }
            else if (e.target.textContent === 'Magic! ✨') {
                player1Attack.push('✨')
                console.log(player1Attack)
                btn.style.background = 'crimson'
                btn.disabled = true
            }
            else {
                player1Attack.push('🔮')
                console.log(player1Attack)
                btn.style.background = 'crimson'
                btn.disabled = true
            }
            player2AttackSelection()
        })
    })
}

// PLAYER 2'S FIGHTER SELECTION
function player2FighterChoise(playertwo) {
    // Displaying player 2's fighter on the screen with all their characteristics
    player2NameIndicator.textContent = playertwo.name
    thumbnailImagePlayer2.src = playertwo.picture

    // Getting the attacks of Player 2
    player2AttackBtns = playertwo.attacks
    attackSequence()
}

// PLAYER 2's ATTACK SELECTION
function player2AttackSelection() {
    let randomAttack = randomNumber(0, player2AttackBtns.length - 1)

    if (randomAttack === 0 || randomAttack === 1) {
        player2Attack.push('🥊')
    }
    else if (randomAttack === 3 || randomAttack === 4) {
        player2Attack.push('✨')
    }
    else {
        player2Attack.push('🔮')
    }
    console.log(player2Attack)
    startFight()
}

function startFight() {
    if (player1Attack.length === 5) {
        combat()
    }
}

// MECHANICS OF COMBAT
function indexOfPlayers(player1, player2) {
    player1AttackIndex = player1Attack[player1]
    player2AttackIndex = player2Attack[player2]
}

function combat() {
    // Displaying the results of the battle between Player 1 and Player 2 on the screen
    for (let index = 0; index < player1Attack.length; index++) {
        if (player1Attack[index] === player2Attack[index]) {
            indexOfPlayers(index, index)
            messageCreator('You have tied!')
        }
        else if (
            player1Attack[index] === 'Physical! 🥊' && player2Attack[index] === 'Special! 🔮' ||
            player1Attack[index] === 'Magic! ✨' && player2Attack[index] === 'Physical! 🥊' ||
            player1Attack[index] === 'Special! 🔮' && player2Attack[index] === 'Magic! ✨'
        ) {
            player1Wins ++
            indexOfPlayers(index, index)
            messageCreator('You have won!')
            player1WinsIndicator.textContent = player1Wins
        }
        else {
            player2Wins ++
            indexOfPlayers(index, index)
            messageCreator('You have lost!')
            player2WinsIndicator.textContent = player2Wins
        }
    }
    reviewVictories()
}

function reviewVictories() {
    // "Generating the final result of the battle
    if(player1Wins === player2Wins) {
        winnerIndicator('¡This battle has ended in a DRAW!')
    }
    else if (player1Wins > player2Wins) {
        winnerIndicator('CONGRATULATIONS!, you have been the ultimate winner.')
    }
    else {
        winnerIndicator('What a pity, you have been completely ANNIHILATED!')
    }
}

function messageCreator(result) {
    let printPlayer1Attack = document.createElement('p')
    let printPlayer2Attack = document.createElement('p')

    messageSection.innerHTML = result
    printPlayer1Attack.innerHTML = player1AttackIndex
    printPlayer2Attack.innerHTML = player2AttackIndex

    player1AttackIndicator.appendChild(printPlayer1Attack)
    player2AttackIndicator.appendChild(printPlayer2Attack)
}

// WINNER INDICATOR
function winnerIndicator(finalResult) {
    messageSection.innerHTML = finalResult
    restartSection.style.display = 'block'
}

// RESTART GAME
function restartGame() {
    location.reload()
}

//
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min ++) + min)
}

// CANVAS MECHANIC OF THE GAME
function printGameCanvas() {
    fighterInCanvas.x = fighterInCanvas.x + fighterInCanvas.speedInX
    fighterInCanvas.y = fighterInCanvas.y + fighterInCanvas.speedInY
    canvas.clearRect(0, 0, gameMap.width, gameMap.height)
    canvas.drawImage(
        mapBackgroundImage,
        0,
        0,
        gameMap.width,
        gameMap.height
    )
    fighterInCanvas.printFighter()
    playerTwoScott.printFighter()
    playerTwoRamona.printFighter()
    playerTwoKim.printFighter()
    playerTwoLucas.printFighter()
    playerTwoTodd.printFighter()
    playerTwoRoxie.printFighter()
    if (fighterInCanvas.speedInX !== 0 || fighterInCanvas.speedInY !== 0) {
        checkCollisionBetweenFihgters(playerTwoScott)
        checkCollisionBetweenFihgters(playerTwoRamona)
        checkCollisionBetweenFihgters(playerTwoKim)
        checkCollisionBetweenFihgters(playerTwoLucas)
        checkCollisionBetweenFihgters(playerTwoTodd)
        checkCollisionBetweenFihgters(playerTwoRoxie)
    }
}
function moveFighterRight() {
    fighterInCanvas.speedInX = 5
}
function moveFighterLeft() {
    fighterInCanvas.speedInX = - 5
}
function moveFighterDown() {
    fighterInCanvas.speedInY = 5
}
function moveFighterUp() {
    fighterInCanvas.speedInY = - 5
}
function stopMovement() {
    fighterInCanvas.speedInX = 0
    fighterInCanvas.speedInY = 0
}
function pressKey(event) {
    // Los eventlistener retornan un evento, un evento es un objeto
    // que nos dice por ejemplo que tecla se presiono.
    switch (event.key) {
        case 'ArrowUp':
            moveFighterUp()
            break
        case 'ArrowDown':
            moveFighterDown()
            break
        case 'ArrowRight':
            moveFighterRight()
            break
        case 'ArrowLeft':
            moveFighterLeft()
        default:
            break
    }
}
function startMapMiniGame() {
    gameMap.width = 520
    gameMap.height = 320
    fighterInCanvas = printingFighterSelectedInCanvas(player1Fighter)

    interval = setInterval(printGameCanvas, 50)
    window.addEventListener('keydown', pressKey)
    window.addEventListener('keyup', stopMovement)
}
function printingFighterSelectedInCanvas() {
    for (let i = 0; i < fighters.length; i++) {
        if (player1Fighter === fighters[i].name) {
            return fighters[i]
        }
    }
}
function checkCollisionBetweenFihgters(playertwo) {
    // Player two position
    const playerTwoUp = playertwo.y
    const playerTwoDown = playertwo. y + playertwo.height
    const playerTwoRight = playertwo.x + playertwo.width
    const playerTwoLeft = playertwo.x

    // Player one position (fighterInCanvas hace referencia al peleador elegido por el jugador1)
    const playerOneUp = fighterInCanvas.y
    const playerOneDown = fighterInCanvas. y + fighterInCanvas.height
    const playerOneRight = fighterInCanvas.x + fighterInCanvas.width
    const playerOneLeft = fighterInCanvas.x

    if (playerOneDown < playerTwoUp || playerOneUp > playerTwoDown || playerOneRight < playerTwoLeft || playerOneLeft > playerTwoRight) {
        return
    }
    stopMovement()

    // Stop the interval that refresh the canvas and check the collisions
    clearInterval(interval)

    // Displaying the attack selection section on the screen and hiding the canvas section
    mapSection.style.display = 'none'
    attackSelectionSection.style.display = 'flex'

    player2FighterChoise(playertwo)
}

window.addEventListener('load', startGame)