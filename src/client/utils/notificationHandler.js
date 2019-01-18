import {toast} from "react-toastify";
import {TYPE_MESSAGE} from '../../common/const';

export function notify(message, type) {

  switch (type) {
    case TYPE_MESSAGE.success: {
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
    case TYPE_MESSAGE.error: {
      toast.error(message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      break;
    }
    case TYPE_MESSAGE.warning: {
      toast.warn(message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      break;
    }
    case TYPE_MESSAGE.info: {
      toast.info(message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      break;
    }
    default: {
      toast(message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      break;
    }
  }
};
