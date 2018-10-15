import {tetriAction} from "../actions/tetrimino";
import {store} from "../index";

const eventHandler = (event) => {
  if (store.getState().user.name && store.getState().game.name) {
    event.preventDefault()
    store.dispatch(tetriAction(event.code))
  }

};

export {eventHandler};
