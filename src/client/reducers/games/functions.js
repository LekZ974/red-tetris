
const reducerGetGames = (state, action) => {
  return {
      ...state,
      items: action.data,
      isLoading: false
  }
}

export {
  reducerGetGames,
}
