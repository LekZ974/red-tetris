import {store} from '../index';
import { addMalusToUser, updateGrid } from '../actions/user';

function speedManage(action, params) {
  if (action.data.speedDelay && action.data.level > 0) {
    switch (params.speed) {
      case 'NO_SPEED' : {
        action.data.speedDelay = 500;
        break;
      }
      case 'MEDIUM_MODE' : {
        action.data.speedDelay = (action.data.speedDelay * 0.7);
        break;
      }
      case 'HARD_MODE' : {
        if (action.data.level <= 5) {
          action.data.speedDelay = (action.data.speedDelay / (action.data.level));
        }
        break;
      }
      case 'EASY_MODE':
      default:
        break;
    }
  }
}

function malusManage(action, params, user) {
  if (store.getState().user.level !== action.data.level && action.data.level > 0 && 0 === action.data.level % 2) {
    store.dispatch(addMalusToUser(user.malus + 1))
  }
}

function soloManageMode(action, params, user) {
  speedManage(action, params);
  malusManage(action, params, user)
}

export {
  soloManageMode,
}
