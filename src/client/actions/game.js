import {tetriStep} from "./tetrimino";

export const GAME_STATUS = 'game/GAME_STATUS'
export const GAME_FLOW = 'game/GAME_FLOW'

export const gameStatus = (status) => ({
  type: GAME_STATUS,
  gameStatus: status,
  thenFn: dispatch => {
    dispatch(gameFlow(status))
  }
})

export const gameFlow = (action) => ({
  type: GAME_FLOW,
  gameAction: action
})
