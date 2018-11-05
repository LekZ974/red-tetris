export const TETRI_STEP = 'tetrimino/TETRI_STEP'
export const TETRI_ACTION = 'tetrimino/TETRI_ACTION'
export const TETRI_INIT_NEW = 'tetrimino/TETRI_INIT_NEW'
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
export const tetriInitNew = (game) => ({
  type: TETRI_INIT_NEW,
  game: game,
})
export const tetriIsBlock = () => ({
  type: TETRI_IS_BLOCK,
})
export const tetriPosIsNotValid = () => ({
  type: TETRI_POS_IS_NOT_VALID,
})
