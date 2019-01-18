import reducer from '../../../src/client/reducers/user/user'
import { initialState } from '../../../src/client/reducers/user/user'
import {
  USER_CONNECT,
  USER_INIT,
  EMIT_USER_LOGIN,
  RCV_USER_LOGIN,
  USER_UPDATE,
  USER_UPDATE_GRID,
  USER_INIT_STATE,
  EMIT_USER_LOST,
  USER_ADD_MALUS,
  EMIT_USER_WIN,
  EMIT_USER_LEAVE_GAME, EMIT_USER_JOIN_GAME, RCV_USER_JOIN_GAME,
} from '../../../src/client/actions/user'


describe('user reducer test',()=>{
  it('should render nothing', ()=>{
    expect(reducer(undefined, {})).toEqual(initialState)
  })
  it('should render nothing', ()=>{
    expect(reducer(initialState, {
      type:'FOO'
    })).toEqual(initialState)
  })
  it('should render something when no parameter is pass', ()=>{
    expect(reducer()).toEqual(initialState)
  })
  it('should test USER_CONNECT',()=>{
    expect(reducer(initialState, {
      type:USER_CONNECT
    }))
      .toEqual({
        id: '',
        name: '',
        gameName: '',
        role: 'master',
        connected: true,
        grid: [],
        completeLine: 0,
        lost: false,
        malus: 0,
        winner: false,
        payload: {},
        isLoading: false,
        speedDelay: 500,
        count: 0,
        level: 0,
        score: 0,
      })
  })
  it('should test EMIT_USER_LOGIN', () =>{
    expect(reducer(initialState,{
      type:EMIT_USER_LOGIN,
      userName: 'TOTO'
    }))
      .toEqual({
        id:'',
        name:'',
        gameName: '',
        role:'master',
        connected: false,
        grid:[],
        completeLine: 0,
        payload: {},
        lost: false,
        malus: 0,
        winner: false,
        isLoading: true,
        speedDelay: 500,
        count: 0,
        level: 0,
        score: 0,
      })
  })
  it('should test RCV_USER_LOGIN', () =>{
    expect(reducer(initialState,{
      type:RCV_USER_LOGIN,
      somedata: "data",
    }))
      .toEqual({
        id:'',
        name:'',
        gameName: '',
        role:'master',
        connected: false,
        grid:[],
        completeLine: 0,
        payload: {},
        lost: false,
        malus: 0,
        winner: false,
        isLoading: false,
        speedDelay: 500,
        count: 0,
        level: 0,
        score: 0,
      })
  })
  it('should test USER_LOGIN when status is wrong', () =>{
    expect(reducer(initialState,{
      type:RCV_USER_LOGIN,
      payload:{
        id:'1',
        name:'Golden',
        gameName: 'Fancy',
        role:'master',
        connected: true,
        completeLine: 0,
        grid:[0,0,0],
        lost: false,
      }
    }))
      .toEqual(initialState)
  })
  it('should test USER_INIT', ()=>{
    expect(reducer({
      id: '',
      name: '',
      gameName: '',
      role: 'master',
      connected: false,
      grid: [],
      completeLine: 0,
      payload: {},
      isLoading: false,
    }, {
      type:USER_INIT
    }))
      .toEqual(initialState)
  })
  it('should test USER_UPDATE', ()=>{
    expect(reducer({
      name: 'toto',
      role: 'a role'
    }, {
      type:USER_UPDATE,
      data: {role: 'A role for test'}
    }))
      .toEqual({name: 'toto', role:'A role for test'})
  })
  it('should test USER_UPDATE_GRID', ()=>{
    expect(reducer({}, {
      type:USER_UPDATE_GRID,
      grid: [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]]
    }))
      .toEqual({completeLine: 0, grid: [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]]})
  })
  it('should test USER_UPDATE_GRID with a complete line', ()=>{
    expect(reducer({}, {
      type:USER_UPDATE_GRID,
      grid: [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[1,1,1,1,1]]
    }))
      .toEqual({completeLine: 1, grid: [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]]})
  })
  it('should test USER_UPDATE_GRID with a lost grid', ()=>{
    expect(reducer({}, {
      type:USER_UPDATE_GRID,
      grid: [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,1,0],[1,1,0,1,1]]
    }))
      .toEqual({completeLine: 0, grid: [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0,0,0,1,0], [1,1,0,1,1]]})
  })
  it('should test USER_INIT_STATE', ()=>{
    expect(reducer({}, {
      type:USER_INIT_STATE,
    }))
      .toEqual(initialState)
  })
  it('should test EMIT_USER_LOST', ()=>{
    expect(reducer({}, {
      type:EMIT_USER_LOST,
    }))
      .toEqual({connected: false, lost: true, grid: []})
  })
  it('should test EMIT_USER_WIN', ()=>{
    expect(reducer({}, {
      type:EMIT_USER_WIN,
    }))
      .toEqual({connected: false, winner: true, grid: []})
  })
  it('should test USER_ADD_MALUS', ()=>{
    expect(reducer({}, {
      type:USER_ADD_MALUS,
      data: 'data malus'
    }))
      .toEqual({malus: 'data malus'})
  })
  it('should test EMIT_USER_LEAVE_GAME', ()=>{
    expect(reducer({}, {
      type:EMIT_USER_LEAVE_GAME,
    }))
      .toEqual({isLoading: true})
  })
  it('should test EMIT_USER_JOIN_GAME', ()=>{
    expect(reducer({}, {
      type:EMIT_USER_JOIN_GAME,
      userName: 'A NAME',
      gameName: 'A GAMENAME'
    }))
      .toEqual({isLoading: true, name: 'A NAME', gameName: 'A GAMENAME'})
  })
  it('should test RCV_USER_JOIN_GAME', ()=>{
    expect(reducer({}, {
      type:RCV_USER_JOIN_GAME,
    }))
      .toEqual({isLoading: false})
  })
})
