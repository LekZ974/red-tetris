
const reducerRcvGetGames = (state, action) => {
  return {
      ...state,
      items: action.data,
      isLoading: false
  }
}

const reducerEmitGetGames = (state) => {
  return {
    ...state,
    isLoading: true,
  }
}

export {
  reducerRcvGetGames,
  reducerEmitGetGames,
}
