
const reducerGetGames = (state, action) => {
  if ('success' === action.status){
    return {
      ...state,
      items: action.payload,
      isLoading: false
    }
  }
  return action.payload ? {...state, isLoading: true} : {...state, items: [], isLoading: false}
}

export {
  reducerGetGames,
}
