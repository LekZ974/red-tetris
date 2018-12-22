import board from '../constants/board'

export default class Spectre {
	constructor(board) {
		this.spectre = board
	}

    clearSpectre() {
		for (let i = 0; i < this.spectre.length; i++) {
			for (let j = 0; j < this.spectre[i].length; j++) {
				this.spectre[i][j] = 0;
			}
		}
	}

    fillMalus(numMalus) {
        if (numMalus > 0) {
            let row = this.spectre.length - 1
            for (let i = numMalus; i > 0; i--) {
                for (let col = 0; col < this.spectre[row].length; col++) {
                    this.spectre[row][col] = -1
                }
                row--
            }
        }
    }

    fillSpectreCol(row, col) {
        if (row < 0) {
            row = 0
        }
        for (let i = row; i < this.spectre.length; i++) {
            if (this.spectre[i][col] !== -1)
                this.spectre[i][col] = 1
        }
    }

	generateSpectre(playerGrid, malus) {
        if (!playerGrid || malus < 0)
            return this.spectre
        this.clearSpectre()
        this.fillMalus(malus)

        let rowsFilled = 0
		for (let i = 0; i < playerGrid.length; i++) {
			for (let j = 0; j < playerGrid[i].length; j++) {
				if (playerGrid[i][j] > 0) {
                    this.fillSpectreCol(i - malus, j)
                    rowsFilled++
                }
			}
            if (rowsFilled === board.WIDTH)
                break
		}
        return this.spectre
	}
}
