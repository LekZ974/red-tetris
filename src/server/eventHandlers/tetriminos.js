import shapes from '../constants/shapes'

const randomNumber = function(min, max) {
   return Math.floor(Math.random() * (max - min + 1)) + min
}

const getShape = function() {
    let i = randomNumber(0, shapes.length - 1)
	let shape = {
		shape: []
	}

	shape.shape = shapes[i]
	return shape
}

export default getShape 
