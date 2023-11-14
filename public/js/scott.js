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

// BACKEND VARIABLES
let playerId = null
let playerTwoId = null
let enemiesFighters = []

// FIGHTER CONSTRUCTOR
class Fighter {
    // When the value of an object's property is a function, it is called a method.
    constructor(name, picture, lives, mapPicture, id = 0) {
        this.id = id
        this.name = name
        this.picture = picture
        this.lives = lives
        this.attacks = []
        // Attributes of the fighter on the canvas.
        this.width = 50
        this.height = 50
        this.x = randomNumber(0, gameMap.width - this.width)
        this.y = randomNumber(0, gameMap.height - this.height)
        this.pictureInCanvas = new Image()
        this.pictureInCanvas.src = mapPicture
        this.speedInX = 0
        this.speedInY = 0
    }
    // Method to paint the player on the game map. (the method is a function associated with an object.)
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

// FIGHTERS CREATION
let scott = new Fighter('Scott', '../assets/img/scott.gif', 5, '../assets/canvas-img/scott-map.jpg')
let ramona = new Fighter('Ramona', '../assets/img/ramona.gif', 5, '../assets/canvas-img/ramona-map.jpg')
let kim = new Fighter('Kim', '../assets/img/kim.gif', 5, '../assets/canvas-img/kim-map.jpg')
let lucas = new Fighter('Lucas', '../assets/img/lucas.gif', 5, '../assets/canvas-img/lucas-map.jpg')
let todd = new Fighter('Todd', '../assets/img/todd.gif', 5, '../assets/canvas-img/todd-map.jpg')
let roxie = new Fighter('Roxie', '../assets/img/roxie.gif', 5, '../assets/canvas-img/roxie-map.jpg')

// FIGHTERS ATTACKS
const scottAttacks = [
    {name: 'Physical! 🥊', id: 'btn-physical'},
    {name: 'Physical! 🥊', id: 'btn-physical'},
    {name: 'Physical! 🥊', id: 'btn-physical'},
    {name: 'Magic! ✨', id: 'btn-magic'},
    {name: 'Special! 🔮', id: 'btn-special'}
]
const ramonaAttacks = [
    {name: 'Magic! ✨', id: 'btn-magic'},
    {name: 'Magic! ✨', id: 'btn-magic'},
    {name: 'Magic! ✨', id: 'btn-magic'},
    {name: 'Physical! 🥊', id: 'btn-physical'},
    {name: 'Special! 🔮', id: 'btn-special'}
]
const kimAttacks = [
    {name: 'Special! 🔮', id: 'btn-special'},
    {name: 'Special! 🔮', id: 'btn-special'},
    {name: 'Special! 🔮', id: 'btn-special'},
    {name: 'Physical! 🥊', id: 'btn-physical'},
    {name: 'Magic! ✨', id: 'btn-magic'}
]
const lucasAttacks = [
    {name: 'Physical! 🥊', id: 'btn-physical'},
    {name: 'Physical! 🥊', id: 'btn-physical'},
    {name: 'Physical! 🥊', id: 'btn-physical'},
    {name: 'Magic! ✨', id: 'btn-magic'},
    {name: 'Special! 🔮', id: 'btn-special'}
]
const toddAttacks = [
    {name: 'Magic! ✨', id: 'btn-magic'},
    {name: 'Magic! ✨', id: 'btn-magic'},
    {name: 'Magic! ✨', id: 'btn-magic'},
    {name: 'Physical! 🥊', id: 'btn-physical'},
    {name: 'Special! 🔮', id: 'btn-special'}
]
const roxieAttacks = [
    {name: 'Special! 🔮', id: 'btn-special'},
    {name: 'Special! 🔮', id: 'btn-special'},
    {name: 'Special! 🔮', id: 'btn-special'},
    {name: 'Physical! 🥊', id: 'btn-physical'},
    {name: 'Magic! ✨', id: 'btn-magic'}
]

scott.attacks.push(...scottAttacks)
ramona.attacks.push(...ramonaAttacks)
kim.attacks.push(...kimAttacks)
lucas.attacks.push(...lucasAttacks)
todd.attacks.push(...toddAttacks)
roxie.attacks.push(...roxieAttacks)

fighters.push(scott, ramona, kim, lucas, todd, roxie)

// Hiding by default the restart game section.
restartSection.style.display = 'none'

// START GAME
function startGame() {
    // Hiding the attack selection, the canvas and the game reset's section.
    attackSelectionSection.style.display = 'none'
    mapSection.style.display = 'none'

    // Creating a selection card for every fighter.
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
    // Button to select player one's fighter.
    selectFighterBtn.addEventListener('click', player1FighterChoise)

    // Game restart button
    restartBtn.addEventListener('click', restartGame)

    // Request to join the game server.
    joinGame()
}

// Function that connects us to the server.
function joinGame() {
    fetch(`http://localhost:8080/joinGame`)
    .then((res) => {
        if (res.ok) {
            res.text()
            .then((answer) => {
                console.log(answer);
                playerId = answer
            })
        }
    })
}

// PLAYER 1 FIGHTER CHOISE
function player1FighterChoise() {
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
        alert('Select a fighter!')
        return
    }
    // Hiding the fighter selection section
    playerSelectionSection.style.display = 'none'

    // Sending our choice to the server.
    fighterSelected(player1Fighter)

    // Extracting the player's attacks.
    extractAttacks(player1Fighter)

    // Displaying the canvas section.
    mapSection.style.display = 'flex'

    // Mini game: find your opponent on the canvas to start the battle.
    startMapMiniGame()
}

// Sending the information of the player's fighter to the server.
function fighterSelected(player1Fighter) {
    fetch(`http://localhost:8080/fighter/${playerId}`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            fighter: player1Fighter
        })
    })
}

// ATTACK EXTRACTION FUNCTION
function extractAttacks(player1Fighter) {
    // We iterate through our 'fighters' array to find the fighter chosen by Player 1,
    // then extract the attacks of Player 1's fighter and display them as the attack buttons.
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
    // Iterating through each attack to obtain its respective button.
    attacks.forEach((attack) => {
        // Generating buttons for each different attack of Player 1's fighter.
        player1AttackBtns = `<button id=${attack.id} class="btn attack__btn">${attack.name}</button>`

        // Adding each attack button to our attack container in HTML.
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
                player1Attack.push('Physical! 🥊')
                console.log(player1Attack)
                btn.style.background = 'crimson'
                btn.disabled = true
            }
            else if (e.target.textContent === 'Magic! ✨') {
                player1Attack.push('Magic! ✨')
                console.log(player1Attack)
                btn.style.background = 'crimson'
                btn.disabled = true
            }
            else {
                player1Attack.push('Special! 🔮')
                console.log(player1Attack)
                btn.style.background = 'crimson'
                btn.disabled = true
            }
            if (player1Attack.length === 5) {
                sendAttacks()
            }
        })
    })
}
// Sending the player's choice of attacks to the server.
function sendAttacks() {
    fetch(`http://localhost:8080/fighter/${playerId}/attacks`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            attacks: player1Attack
        })
    })
    interval = setInterval(getAttacks, 50)
}
// Getting the attacks of the second player.
function getAttacks() {
    fetch(`http://localhost:8080/fighter/${playerTwoId}/attacks`)
        .then((res) => {
            if (res.ok) {
                res.json()
                .then(({ attacks }) => {
                    if (attacks.length === 5) {
                        player2Attack = attacks
                        combat()
                    }
                })
            }
        })
}

// PLAYER 2'S FIGHTER SELECTION
function player2FighterChoise(playertwo) {
    // Displaying player 2's fighter on the screen with all their characteristics.
    player2NameIndicator.textContent = playertwo.name
    thumbnailImagePlayer2.src = playertwo.picture
    attackSequence()
}

// MECHANICS OF COMBAT
function indexOfPlayers(player1, player2) {
    player1AttackIndex = player1Attack[player1]
    player2AttackIndex = player2Attack[player2]
}
function combat() {
    // Turning off the interval generated in the sendAttacks function.
    clearInterval(interval)

    // Displaying the results of the battle between Player 1 and Player 2 on the screen.
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
            indexOfPlayers(index, index)
            messageCreator('You have won!')
            player1Wins ++
            player1WinsIndicator.textContent = player1Wins
        }
        else {
            indexOfPlayers(index, index)
            messageCreator('You have lost!')
            player2Wins ++
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
        winnerIndicator('CONGRATULATIONS! You have been the ultimate winner!')
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

// GENERATE A RANDOM NUMBER
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

    // Function that sends the player's position on the canvas to server.
    sendPositionInCanvas(fighterInCanvas.x, fighterInCanvas.y)

    enemiesFighters.forEach((fighter) => {
        fighter.printFighter()
        checkCollisionBetweenFihgters(fighter)
    })
}
function sendPositionInCanvas(x, y) {
    fetch(`http://localhost:8080/fighter/${playerId}/positionInCanvas`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            x,
            y
        })
    })
    .then((res) => {
        if (res.ok) {
            res.json()
                .then(({ enemies }) => {
                    console.log(enemies)
                    enemiesFighters = enemies.map((enemy) => {
                        let playerTwoFighter = null
                        const fighterName = enemy.fighter.name || ''
                        if (fighterName === 'Scott') {
                            playerTwoFighter = new Fighter ('Scott', '../assets/img/scott.gif', 5, '../assets/canvas-img/scott-map.jpg', enemy.id)
                        }
                        else if (fighterName === 'Ramona') {
                            playerTwoFighter = new Fighter ('Ramona', '../assets/img/ramona.gif', 5, '../assets/canvas-img/ramona-map.jpg', enemy.id)
                        }
                        else if (fighterName === 'Kim') {
                            playerTwoFighter = new Fighter ('Kim', '../assets/img/kim.gif', 5, '../assets/canvas-img/kim-map.jpg', enemy.id)
                        }
                        else if (fighterName === 'Lucas') {
                            playerTwoFighter = new Fighter ('Lucas', '../assets/img/lucas.gif', 5, '../assets/canvas-img/lucas-map.jpg', enemy.id)
                        }
                        else if (fighterName === 'Todd') {
                            playerTwoFighter = new Fighter ('Todd', '../assets/img/todd.gif', 5, '../assets/canvas-img/todd-map.jpg', enemy.id)
                        }
                        else if (fighterName === 'Roxie') {
                            playerTwoFighter = new Fighter ('Roxie', '../assets/img/roxie.gif', 5, '../assets/canvas-img/roxie-map.jpg', enemy.id)
                        }
                        playerTwoFighter.x = enemy.x
                        playerTwoFighter.y = enemy.y
                        return playerTwoFighter
                    })
                })
        }
    })
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
    // The event listeners return an event; an event is an object.
    // Which tells us, for example, which key was pressed.
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
    fighterInCanvas = printingFighterSelectedInCanvas(player1Fighter)
    console.log(fighterInCanvas, player1Fighter)
    interval = setInterval(printGameCanvas, 50)

    gameMap.width = 520
    gameMap.height = 320

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

    // Player one position (fighterInCanvas refers to the fighter chosen by player 1).
    const playerOneUp = fighterInCanvas.y
    const playerOneDown = fighterInCanvas. y + fighterInCanvas.height
    const playerOneRight = fighterInCanvas.x + fighterInCanvas.width
    const playerOneLeft = fighterInCanvas.x

    if (
        playerOneDown < playerTwoUp ||
        playerOneUp > playerTwoDown ||
        playerOneRight < playerTwoLeft ||
        playerOneLeft > playerTwoRight
    ) {
        return
    }
    stopMovement()

    // Stop the interval that refresh the canvas and check the collisions.
    clearInterval(interval)
    console.log('Collision detected!')

    playerTwoId = playertwo.id
    // Displaying the attack selection section on the screen and hiding the canvas section.
    attackSelectionSection.style.display = 'flex'
    mapSection.style.display = 'none'
    player2FighterChoise(playertwo)
}

window.addEventListener('load', startGame)