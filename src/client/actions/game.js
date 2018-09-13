import {tetriStep} from "./tetrimino";

export const GAME_STATUS = 'game/GAME_STATUS'

export const gameStatus = (status) => ({
  type: GAME_STATUS,
  gameStatus: status,
  thenFn: () => {
    if ('Start' === status) {
      console.log('START STEP')
      dispatch(tetriStep)
    }
  }
})
