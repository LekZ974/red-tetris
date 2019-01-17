import {store} from '../index';
import { addMalusToUser } from '../actions/user';
import {SPEED_MODE} from '../../common/const';

const speedManage = (action, params) => {
  if (action.data.speedDelay && action.data.level > 0) {
    switch (params.speed) {
      case SPEED_MODE.noSpeed : {
        action.data.speedDelay = 500;
        break;
      }
      case SPEED_MODE.medium : {
        action.data.speedDelay = (action.data.speedDelay * 0.7);
        break;
      }
      case SPEED_MODE.hard : {
        if (action.data.level <= 5 || 1 === action.data.level % 2) {
          action.data.speedDelay = (action.data.speedDelay / (action.data.level));
        }
        break;
      }
      case SPEED_MODE.easy:
      default:
        break;
    }
  }
}

const malusManage = (action, params, user) => {
  if (store.getState().user.level !== action.data.level && action.data.level > 0 && 0 === action.data.level % 2) {
    store.dispatch(addMalusToUser(user.malus + 1))
  }
}

const soloManageMode = (action, params, user) => {
  speedManage(action, params);
  malusManage(action, params, user)
}

export {
  soloManageMode,
}
