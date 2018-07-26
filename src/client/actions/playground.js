export const GAME_START = 'playground/GAME_START'
export const GAME_PAUSE = 'playground/GAME_PAUSE'
export const GAME_STOP = 'playground/GAME_STOP'
export const GAME_ERROR = 'playground/GAME_ERROR'



export const button = (e) => {
  switch (e.target.innerHTML){
    case'Start':
      return {
        type: GAME_PAUSE
      }
    case'Pause':
      return {
        type: GAME_START
      }
    case 'Stop':
      return {
        type: GAME_STOP
      }
    default:
    return {
      type: GAME_ERROR
    }
  }
}

