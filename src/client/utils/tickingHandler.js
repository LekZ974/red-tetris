import {store} from "../index";
import {tetriInit, tetriStep} from "../actions/tetrimino";
import * as SocketService from "../services/SocketService";
import * as TetriService from "../services/TetriService";

const ticking = () => {
  const game = store.getState().game
  const user = store.getState().user
  if (game.start) {
    // if (store.getState().tetrimino.needNext) {
    //   SocketService.emitGamePieces()
    //   SocketService.emitUpdateGrid(TetriService.placePiece(store.getState().user.grid, store.getState().tetrimino))
    //   store.dispatch(tetriInit())
    // }
    store.dispatch(tetriStep(game, user));
  }
  window.setTimeout(() => ticking(), 1000);
};

export {ticking};
