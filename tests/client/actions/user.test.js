import * as actions from '../../../src/client/actions/user'
import {USER_CONNECT, USER_INIT,USER_LOGIN} from '../../../src/client/actions/user';
import Api from '../../../src/client/mock/Api';

describe('user test all actions', () => {
  it('should test connect function', () => {
      expect(actions.connect()).toEqual({type:USER_CONNECT})
    }
  )
  it('should test login function', () => {
      expect(actions.login("Graziella")).toEqual({type:USER_LOGIN, apiCall: Api.login("Graziella")})
    }
  )
  it('should test init function', () => {
      expect(actions.init()).toEqual({type:USER_INIT})

    }
  )
})
