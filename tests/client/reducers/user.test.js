import reducer from '../../../src/client/reducers/user/user'
import { initialState } from '../../../src/client/reducers/user/user'
import {
  USER_CONNECT,
  USER_INIT,
  EMIT_USER_LOGIN,
  RCV_USER_LOGIN,
} from '../../../src/client/actions/user'
import {GRID_HEIGHT, GRID_WIDTH} from "../../../src/common/grid";
import {PIECES_NUM} from "../../../src/common/pieces";


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
  it('should test USER_LOGIN when status is success', () =>{
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
})
