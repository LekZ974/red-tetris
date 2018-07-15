export default class Piece {
	constructor(shape) {
		this.shape = shape
		this.rotation = [0, 90, 180, 270]
	}

	getShape() {
		return this.shape
	}

	flip(matrix) {
        let newMatrix = matrix[0].map((col, i) => {
            return matrix.map((row) => {
                return row[i]
            })
        })

        return newMatrix
	}

    reverse(matrix) {
        return this.flip(matrix.reverse())
    }

	rotate(degree) {
		let i = 0;
		let rotated = [...this.shape]

		while (i < degree) {
			rotated = this.reverse(rotated)
			i += 90
		}
		return rotated
	}

    randRotation() {
        let min = 0
        let max = this.rotation.length - 1
        let index = Math.floor(Math.random() * (max -min + 1))

        return this.rotation[index]
    }

    getShapeToEmit() {
        return this.rotate(this.randRotation())
    }
}
