import {store} from "../index";
import {tetriStep} from "../actions/tetrimino";

const ticking = () => {
  const game = store.getState().game
  const user = store.getState().user

  if (game.start && game.gameIsStarted) {
    store.dispatch(tetriStep(game, user));
  }
  // window.setTimeout(() => ticking(), user.speedDelay);
  window.setTimeout(() => ticking(), 500);
};

export {ticking};
