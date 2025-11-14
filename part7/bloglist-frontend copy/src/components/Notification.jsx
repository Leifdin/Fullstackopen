import { useSelector } from "react-redux";
const Notification = () => {
  const notification = useSelector((state) => state.notification);
  const background =
    {
      error: "red",
      success: "green",
    }[notification.type] ?? "white";
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    background,
    position: "fixed",
    top: "10px",
    right: '10px',
    opacity: "0.75",
  };
  return (
    <>{notification.isShown && <div style={style}>{notification.msg}</div>}</>
  );
};

export default Notification;
