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

    fillSpectreCol(row, col) {
        for (let i = row; i < this.spectre.length; i++) {
            this.spectre[i][col] = 1
        }
    }

	generateSpectre(playerGrid) {
        this.clearSpectre();
		for (let i = 0; i < playerGrid.length; i++) {
			for (let j = 0; j < playerGrid[i].length; j++) {
				if (playerGrid[i][j] > 0) {
                    this.fillSpectreCol(i, j)
                }
			}
		}
        return this.spectre
	}
}
