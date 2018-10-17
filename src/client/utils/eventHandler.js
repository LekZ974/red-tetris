import {tetriAction} from "../actions/tetrimino";
import {store} from "../index";

const eventHandler = (event) => {
  const user = store.getState().user;
  const game = store.getState().game;
  if (user.name && game.name) {
    event.preventDefault()
    store.dispatch(tetriAction(event.code, game, user))
  }
};

export {eventHandler};
