import * as actions from "../../../src/client/actions/alert"
import { ALERT_POP } from "../../../src/client/actions/alert"

describe('test alert action', ()=>{
  it('should test alert function', ()=>{
    expect(actions.alert('salut')).toEqual({type:ALERT_POP, message:'salut'})
  })
})
