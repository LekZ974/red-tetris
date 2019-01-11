import {store} from "../index";
import {tetriStep} from "../actions/tetrimino";

const ticking = () => {
  const game = store.getState().game
  const user = store.getState().user
  let speed = 500 / game.params.speed

    console.log(speed)

  if (game.start && game.gameIsStarted) {
    store.dispatch(tetriStep(game, user));
  }
  window.setTimeout(() => ticking(), speed);
};

export {ticking};
