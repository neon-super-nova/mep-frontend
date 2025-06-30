import "../page-css/notifications-page.css";
import { useTheme } from "../context/theme-context";
import HeaderBar from "../components/ui-basic-reusables/page-elements/header-bar";
import avatar from "../components/img/user/default-user-light_web.png";

function NotificationsPage() {
  const { theme } = useTheme();

  const Username = "User"; 
  const userAvatar = avatar; 
  const Event = "You have a new message!";
  const thumbnail = avatar; 
  return (
    <div className={theme === "dark" ? "dark-mode" : ""}>
      <div className="notifications-page">
        <HeaderBar />
        <main
          className="notifications-page-main-content"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <div
            className="notifications-page-left-panel"
            style={{ textAlign: "center" }} >
            <h2 className="notifications-page-panel-title">Notifications</h2>
      
          </div>
          <div
            className="notifications-page-left-panel"
            >
            <h3 className="notifications-page-panel-title">Yesterday</h3>
            <p className="notifications-page-panel-desc">   <img src={userAvatar} alt="avatar" className="user-image"/>{Username}{Event}<img src={thumbnail}  alt="thumbnail" className="event-image"/></p>
          </div>
   
        </main>
        <footer className="notifications-page-footer">
          <p>Footer Content</p>
        </footer>
      </div>
    </div>
  );
}

export default NotificationsPage;
