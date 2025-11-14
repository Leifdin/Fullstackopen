import { useContext } from "react";
import NotificationContext from "../context/NotificationContext";

export const useNotify = () => {
  const context = useContext(NotificationContext);

  const notify = (msg, timeout = 5000) => {
    const [, notificationReducer] = context;
    notificationReducer({ type: "SET", payload: msg });
    setTimeout(() => {
      notificationReducer({ type: "CLEAR" });
    }, timeout);
  };
  return notify;
};
