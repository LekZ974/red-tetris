export default class Spectre {
	constructor(board) {
		this.spectre = board
	}

	generateSpectre(playerGrid) {
		for (let i = 0; i < playerGrid.length; i++) {
			for (let j = 0; j < playerGrid[i].length; j++) {
				if (playerGrid[i][j] > 0)
					this.spectre[i][j] = 1
			}
		}
	}

	clearSpectre() {
		for (let i = 0; i < this.spectre.length; i++) {
			for (let j = 0; j < this.spectre[i].length; j++) {
				this.spectre[i][j] = 0;
			}
		}
	}
}
