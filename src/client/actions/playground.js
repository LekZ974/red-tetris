export const GAME_START = 'playground/GAME_START'
export const GAME_PAUSE = 'playground/GAME_PAUSE'
export const GAME_STOP = 'playground/GAME_STOP'
export const GAME_ERROR = 'playground/GAME_ERROR'



export const button = (e) => {
  switch (e){
    case'start':
      return {
        type: GAME_START
      }
    case'pause':
      return {
        type: GAME_PAUSE
      }
    case 'stop':
      return {
        type: GAME_STOP
      }
    default:
    return {
      type: GAME_ERROR
    }
  }
}
