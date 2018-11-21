import {tetriAction} from "../actions/tetrimino";
import {store} from "../index";
import {toast} from "react-toastify";

const eventHandler = (event) => {
  const user = store.getState().user;
  const game = store.getState().game;
  if (user.name && game.name) {
    event.preventDefault()
    store.dispatch(tetriAction(event.code, game, user))
  }
};

const notify = (message, type) => {

  switch (type) {
    case 'success': {
      toast.success(message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      break;
    }
    case 'error': {
      toast.error(message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,      });
      break;
    }
    case 'warning': {
      toast.warn(message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,      });
      break;
    }
    case 'info': {
      toast.info(message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,      });
      break;
    }
    default: {
      toast(message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,      });
      break;
    }
  }
};

export {eventHandler, notify};
