import crypto from 'crypto'

const createId = function(gameName) {
	console.log("in createId: ", gameName)
	const key = 'red-tetris'
	const id = crypto.createHmac('md5', key).update(gameName).digest('hex')

	return id
}

export {
	createId
}