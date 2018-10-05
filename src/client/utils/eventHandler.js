import {tetriAction} from "../actions/tetrimino";
import {store} from "../index";

const eventHandler = (event) => {
  if (!store.getState().user || !store.getState().game) {
    return;
  }
  event.preventDefault()
  store.dispatch(tetriAction(event.code))
};

export {eventHandler};
