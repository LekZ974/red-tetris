export const TETRI_STEP = 'tetrimino/TETRI_STEP'
export const TETRI_ACTION = 'tetrimino/TETRI_ACTION'
export const TETRI_INIT = 'tetrimino/TETRI_INIT'
export const TETRI_NEW = 'tetrimino/TETRI_NEW'
export const TETRI_IS_BLOCK = 'tetrimino/TETRI_IS_BLOCK'
export const TETRI_POS_IS_NOT_VALID = 'tetrimino/TETRI_POS_IS_NOT_VALID'

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
export const tetriNew = (game, tetrimino) => ({
  type: TETRI_NEW,
  game: game,
  tetrimino: tetrimino,
})
export const tetriIsBlock = () => ({
  type: TETRI_IS_BLOCK,
})
export const tetriPosIsNotValid = () => ({
  type: TETRI_POS_IS_NOT_VALID,
})
