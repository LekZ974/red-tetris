import {store} from "../index";
import {tetriStep} from "../actions/tetrimino";

const ticking = () => {
  const game = store.getState().game
  if (game.start) {
    store.dispatch(tetriStep(game));
  }
  window.setTimeout(() => ticking(), 200);
};

export {ticking};
