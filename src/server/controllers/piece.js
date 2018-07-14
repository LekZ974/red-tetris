export default class Piece {
	constructor(shape) {
		this.shape = shape
		this.rotation = [0, 90, 180, 270]
	}

	getShape() {
		return this.shape
	}

	rotateShape(matrix) {
		let rotated = matrix[0].map((col, c) => {
			return matrix.map((row, r) => {
				return matrix[r][c]
			})
		})

		return rotated
	}

	rotate(deg, matrix) {
		let i = 0;
		let tmp = matrix

		while (i <= deg) {
			tmp = this.rotateShape(tmp)
			i += 90
		}
		return tmp
			
	}
}
