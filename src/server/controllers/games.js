export default class Games {
	constructor(socketID) {
		this.socketID = socketID
    this.games = []
	}

	getGames() {
	  return this.games
  }
}
