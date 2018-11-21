import * as actions from "../../../src/client/actions/alert"
import { DISPLAY_COMMAND } from "../../../src/client/actions/alert"

describe('test alert action', ()=>{
  it('should test alert function', ()=>{
    expect(actions.displayCommand()).toEqual({type:DISPLAY_COMMAND})
  })
})
