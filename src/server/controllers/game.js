import gameplay from '../constants/gameplay'

export default class Game {
    constructor(shapes) {
        this.shapes = shapes
        this.master = null
        this.challenger = []
        this.roomID = ''
        this.roomName = ''
        this.gameStarted = false
        this.shapeOrder = {
            shapes: [],
            requestId: null
        }
		this.numLosers = 0
        this.speed = gameplay.MIN_SPEED
        this.solo = {
            solo_mode: false,
            count: 0,
            level: gameplay.MIN_LVL,
            speed: gameplay.MIN_SPEED
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
