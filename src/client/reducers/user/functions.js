import * as TetriService from '../../services/TetriService';

const reducerUserConnect = (state) => {
  return {
    ...state,
    connected: true,
  }
}

const reducerEmitUserLogin = (state) => {
  return {
    ...state,
    isLoading: true,
  }
}

const reducerRcvUserLogin = (state) => {
  return {
    ...state,
    isLoading: false,
  }
}

const reducerEmitUserJoinGame = (state, action) => {
  return {
    ...state,
    name: action.userName,
    gameName: action.gameName,
    isLoading: true,
  }
}

const reducerRcvUserJoinGame = (state) => {
  return {
    ...state,
    isLoading: false,
  }
}

const reducerEmitUserLeaveGame = (state) => {
  return {
    ...state,
    isLoading: true,
  }
}

const reducerUserUpdate = (state, action) => {
  return {
    ...state,
    ...action.data,
  }
}

const reducerUserInit = (state) => {
  return {
    ...state,
    connected: false,
    grid: [],
    completeLine: 0,
    payload: {},
    malus: 0,
    lost: false,
    winner: false,
    isLoading: false,
    count: 0,
    speedDelay: 500,
    level: 0,
    score: 0,
  }
}

const reducerUserUpdateGrid = (action, state) => {
  let newGrid = action.grid
  let nbLineDel;
  [newGrid, nbLineDel] = TetriService.gridDelLine(newGrid);

  return {
    ...state,
    completeLine: nbLineDel,
    grid: newGrid,
  }
}

const reducerEmitUserLost = (state) => {
  return {
    ...state,
    connected: false,
    lost: true,
    grid: [],
  }
}

const reducerEmitUserWin = (state) => {
  return {
    ...state,
    connected: false,
    winner: true,
    grid: [],
  }
}

const reducerUserAddMalus = (state, action) => {
  return {
    ...state,
    malus: action.data,
  }
}

export {
  reducerEmitUserJoinGame,
  reducerEmitUserLeaveGame,
  reducerEmitUserLogin,
  reducerEmitUserLost,
  reducerEmitUserWin,
  reducerRcvUserJoinGame,
  reducerRcvUserLogin,
  reducerUserAddMalus,
  reducerUserConnect,
  reducerUserInit,
  reducerUserUpdate,
  reducerUserUpdateGrid,
}
