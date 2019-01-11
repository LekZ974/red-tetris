import {tetriAction} from "../actions/tetrimino";
import {store} from "../index";

export function eventHandler(event) {
  const user = store.getState().user;
  const game = store.getState().game;
  if (user.name && game.name) {
    event.preventDefault()
    store.dispatch(tetriAction(event.code, game, user))
  }
};

export function gameExist(gameName, listGames) {
  if (Array.isArray(listGames) && listGames.length >= 1) {
    return listGames.map(game => {
      return gameName === game;
    })
  }
  return false
}
