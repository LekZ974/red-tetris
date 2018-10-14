import reducer from '../../../../src/client/reducers/alert'
import {ALERT_POP} from '../../../../src/client/actions/alert'

const message = "Hello there"


describe('alert recucer', ()=>{
  it('should render empty state', ()=>{
    expect(reducer(undefined, {}))
      .toEqual({})
  })
  it('shouls render state with msg', ()=>{

    expect(reducer({},{
      type:ALERT_POP,
      message:message
    })).toEqual({
      message: message
    })
  })
  it('should render nothing if type is not the good right', ()=>{

    expect(reducer({},{
      type:"ALERT",
      message:message
    })).toEqual({})
  })
})
