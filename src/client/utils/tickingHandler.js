import {store} from "../index";
import {tetriInit, tetriStep} from "../actions/tetrimino";
import * as SocketService from "../services/SocketService";
import * as TetriService from "../services/TetriService";

const ticking = () => {
  const game = store.getState().game
  const user = store.getState().user
  if (game.start) {
    store.dispatch(tetriStep(game, user));
  }
  window.setTimeout(() => ticking(), 500);
};

export {ticking};
