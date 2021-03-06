export default class Player {
	constructor(playerID, socketID) {
		this.playerID = playerID
		this.socketID = socketID
		this.login = '',
		this.master = false
		this.piece = -1
		this.board = null
		this.spectre = null
		this.inGameLoser = false
		this.malus = 0
		this.score = 0
	}

	getPlayerID() {
		return this.playerID
	}

	getSocketID() {
		return this.socketID
	}

	getLogin() {
		return this.login
	}

	setLogin(login) {
		this.login = login
	}

	setAsMaster() {
		this.master = true
	}
	
	isMaster() {
		return this.master
	}
}
