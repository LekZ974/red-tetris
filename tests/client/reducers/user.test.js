import reducer from '../../../src/client/reducers/user/user'
import { initialState } from '../../../src/client/reducers/user/user'
import {
  USER_CONNECT,
  USER_INIT,
  EMIT_USER_LOGIN,
  RCV_USER_LOGIN, USER_UPDATE, USER_UPDATE_GRID,
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
        loosed: false,
        payload: {},
        isLoading: false,
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
        loosed: false,
        isLoading: true,
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
        loosed: false,
        isLoading: false,
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
        loosed: false,
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
      loosed: false,
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
      .toEqual({completeLine: 0, grid: [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]], loosed: false})
  })
  it('should test USER_UPDATE_GRID with a complete line', ()=>{
    expect(reducer({}, {
      type:USER_UPDATE_GRID,
      grid: [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[1,1,1,1,1]]
    }))
      .toEqual({completeLine: 1, grid: [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]], loosed: false})
  })
  it('should test USER_UPDATE_GRID with a lost grid', ()=>{
    expect(reducer({}, {
      type:USER_UPDATE_GRID,
      grid: [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,1,0],[1,1,0,1,1]]
    }))
      .toEqual({completeLine: 0, grid: [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0,0,0,1,0], [1,1,0,1,1]], loosed: true})
  })
})
