import crypto from 'crypto'

const getGameId = function(gameName) {
	const key = 'red-tetris'
	const id = crypto.createHmac('md5', key).update(gameName).digest('hex')

	return id
}

export {
	getGameId
}
