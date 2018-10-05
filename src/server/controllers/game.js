export default class Game {
    constructor(shapes) {
        this.shapes = shapes
        this.master = null
        this.challenger = null
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
        this.challenger = challenger
    }

    setGameStarted() {
        this.gameStarted = true
    }

    waitingForPlayers() {
        if (this.master && this.challenger)
            return false
        return true
    }
}
