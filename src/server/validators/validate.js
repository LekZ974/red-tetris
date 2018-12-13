import routes from '../constants/routes'
import boardSpec from '../constants/board'

const checkBoardSize = function(board) {
    if (!board)
        return false
    let col = 0;
    board.forEach((row) => {
        if (row.length != boardSpec.WIDTH)
            return false
        col++
    })
    if (col != boardSpec.LENGTH)
        return false
    return true
}

const checkMalus = function(board) {
    if (!board)
        return -1
    let malus = 0
    board.forEach((row) => {
        let rowVal = 0
        for (let i = 0; i < row.length; i++) {
            if (row[i] === boardSpec.MALUS)
                rowVal++
        }
        if (rowVal === boardSpec.WIDTH) {
            malus++
        }
    })
    return malus
}

export {
    checkBoardSize,
    checkMalus
}
