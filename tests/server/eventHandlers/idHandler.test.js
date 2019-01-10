import * as idHandler from '../../../src/server/eventHandlers/idHandler'

test('createId', () => {
	let gameName = 'Game1'

	expect(idHandler.getGameId(gameName)).toMatchSnapshot()
})