export const TETRI_STEP = 'tetrimino/TETRI_STEP'
export const TETRI_ACTION = 'tetrimino/TETRI_ACTION'
export const TETRI_INIT = 'tetrimino/TETRI_INIT'
export const TETRI_NEW = 'tetrimino/TETRI_NEW'
export const TETRI_INIT_STATE = 'tetrimino/TETRI_INIT_STATE'

export const tetriStep = (game, user) => ({
  type: TETRI_STEP,
  game: game,
  user: user,
})
export const tetriAction = (action, game, user) => ({
  type: TETRI_ACTION,
  action: action,
  game: game,
  user: user,
})
export const tetriInit = () => ({
  type: TETRI_INIT,
})
export const tetriInitState = () => ({
  type: TETRI_INIT_STATE,
})
export const tetriNew = (game, tetrimino) => ({
  type: TETRI_NEW,
  game: game,
  tetrimino: tetrimino,
})

