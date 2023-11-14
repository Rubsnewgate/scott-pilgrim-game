const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.static('public'))
app.use(express.json())

// List of players joining the server.
const players = []
class Player {
	constructor(id) {
		this.id = id
	}
	assignFighter(fighter) {
		this.fighter = fighter
	}
	updatePlayerPosition(x, y) {
		this.x = x
		this.y = y
	}
	assignAttacks(attacks) {
		this.attacks = attacks
	}
}
class Fighter {
	constructor(name) {
		this.name = name
	}
}

app.get('/joinGame', (req, res) => {
	// Whenever a player joins, they are added to the list and their ID is returned.
	const id = `${Math.random()}`
	const player = new Player(id)
	players.push(player)

	// From which origin are requests allowed to our server.
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.send(id)
})

// :playerId: parameter variable that will have the player's id and their selected character.
app.post('/fighter/:playerId', (req, res) => {
	const playerId = req.params.playerId || ''
	const playerFighter = req.body.fighter || ''
	const fighter = new Fighter(playerFighter)

	const playerIndex = players.findIndex((player) => playerId === player.id)

	if (playerIndex >= 0) {
		players[playerIndex].assignFighter(fighter)
	}

	console.log(players)
	console.log(playerId)
	res.end()
})

app.post('/fighter/:playerId/positionInCanvas', (req, res) => {
	const playerId = req.params.playerId || ''
	const x = req.body.x || 0
	const y = req.body.y || 0

	const playerIndex = players.findIndex((player) => playerId === player.id)

	if (playerIndex >= 0) {
		players[playerIndex].updatePlayerPosition(x, y)
	}

	// Filter to return coordinates of other players.
	const enemies = players.filter((player) => player.id !== playerId && player.fighter !== undefined)

	// Returning all enemies through the response of this request.
	// It's returned using JSON, as Express does not return lists.
	res.send({
		enemies
	})
})

app.post('/fighter/:playerId/attacks', (req, res) => {
	const playerId = req.params.playerId || ''
	const playerAttacks = req.body.attacks || []

	const playerIndex = players.findIndex((player) => playerId === player.id)

	if (playerIndex >= 0) {
		players[playerIndex].assignAttacks(playerAttacks)
	}
	res.end()
})

app.get('/fighter/:playerId/attacks', (req, res) => {
	const playerId = req.params.playerId || ''
	const player = players.find((player) => player.id === playerId)
	res.send({
		attacks: player.attacks || []
	})
})

// Listening to client requests through a port (callback, port).
app.listen(8080, () => {
	console.log('Server is running');
})
