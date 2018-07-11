import shapes from '../constants/shapes'

const randomNumber = function(min, max) {
   return Math.floor(Math.random() * (max - min + 1)) + min
}

const getShape = function() {
    let i = randomNumber(0, shapes.length - 1)

    console.log('i = ', i)
}

export default getShape 
