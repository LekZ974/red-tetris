export const TETRI_STEP = 'tetrimino/TETRI_STEP'
export const TETRI_ACTION = 'tetrimino/TETRI_ACTION'
export const TETRI_INIT_NEW = 'tetrimino/TETRI_INIT_NEW'
export const TETRI_IS_BLOCK = 'tetrimino/TETRI_IS_BLOCK'
export const TETRI_POS_IS_NOT_VALID = 'tetrimino/TETRI_POS_IS_NOT_VALID'

export const tetriStep = game => ({
  type: TETRI_STEP,
  game: game
})
export const tetriAction = action => ({
  type: TETRI_ACTION,
  action: action
})
export const tetriInitNew = () => ({
  type: TETRI_INIT_NEW,
})
export const tetriIsBlock = () => ({
  type: TETRI_IS_BLOCK,
})
export const tetriPosIsNotValid = () => ({
  type: TETRI_POS_IS_NOT_VALID,
})
