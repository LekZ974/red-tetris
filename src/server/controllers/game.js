export default class Game {
    constructor(shapes) {
        this.shapes = shapes
        this.master = null
        this.challenger = []
        this.roomID = ''
        this.roomName = ''
        this.gameStarted = false
        this.boardMaster = null
        this.boardChallenger = null
        this.shapeOrder = {
            shapes: [],
            requestId: null
        }
    }

    setRoomInfo(id, name) {
        this.roomID = id
        this.roomName = name
    }

    setMaster(master) {
        this.master = master
    }

    setChallenger(challenger) {
        this.challenger.push(challenger)
    }

    setGameStarted() {
        this.gameStarted = true
    }

    waitingForPlayers() {
        if (this.master && this.challenger.length > 0)
            return false
        return true
    }
}
