export const TETRI_STEP = 'tetrimino/TETRI_STEP'
export const TETRI_ACTION = 'tetrimino/TETRI_ACTION'

export const tetriStep = game => ({
  type: TETRI_STEP,
  game: game
})
export const tetriAction = action => ({
  type: TETRI_ACTION,
  action: action
})
