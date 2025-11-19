import { useSelector } from "react-redux";
import { NotificationBody } from "./StyledComponents";
const Notification = () => {
  const notification = useSelector((state) => state.notification);
  const background =
    {
      error: "red",
      success: "green",
      delete: "orange",
    }[notification.type] ?? "white";

  return (
    <>
      {notification.isShown && (
        <NotificationBody style={{ background }}>
          {notification.msg}
        </NotificationBody>
      )}
    </>
  );
};

export default Notification;
