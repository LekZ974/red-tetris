import * as actions from '../../../src/client/actions/user'
import {USER_CONNECT, USER_INIT, EMIT_USER_LOGIN} from '../../../src/client/actions/user';

describe('user test all actions', () => {
  it('should test connect function', () => {
      expect(actions.connect()).toEqual({type:USER_CONNECT})
    }
  )
  it('should test login function', () => {
      expect(actions.emitLogin("Graziella")).toEqual({type:EMIT_USER_LOGIN, userName: "Graziella"})
    }
  )
  it('should test init function', () => {
      expect(actions.init()).toEqual({type:USER_INIT})
    }
  )
})
