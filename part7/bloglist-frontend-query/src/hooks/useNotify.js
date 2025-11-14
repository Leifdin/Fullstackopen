import { useDispatch } from "react-redux";
import {
  clearNotification,
  setNotification,
} from "../reducers/notificationReducer";

export const useNotify = () => {
  const dispatch = useDispatch();
  const notify = (msg, timeout = 5000) => {
    dispatch(setNotification(msg));
    setTimeout(() => {
      dispatch(clearNotification());
    }, timeout);
  };
  return notify;
};
