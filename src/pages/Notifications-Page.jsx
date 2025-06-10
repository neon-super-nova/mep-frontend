import "../page-css/notifications-page.css";
import { useTheme } from "../context/theme-context";
import HeaderBar from "../components/ui-basic-reusables/page-elements/header-bar";
import avatar from "../components/img/user/default-user-light_web.png";

function NotificationsPage() {
  const { theme } = useTheme();

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
            <h2 className="notifications-page-panel-title">notifications</h2>
            <img src={avatar} alt="landing" className="notifications-image" />
          </div>
          <div
            className="notifications-page-left-panel"
            style={{ textAlign: "center" }}>
            <h2 className="notifications-page-panel-title">notifications</h2>
            <p className="notifications-page-panel-desc">Left panel content goes here.</p>
          </div>
          <div
            className="notifications-page-left-panel"
            style={{ textAlign: "center" }}>
            <h2 className="notifications-page-panel-title">notifications</h2>
            <p className="notifications-page-panel-desc">Left panel content goes here.</p>
          </div>
          <div
            className="notifications-page-left-panel"
            style={{ textAlign: "center" }}>
            <h2 className="notifications-page-panel-title">notifications</h2>
            <p className="notifications-page-panel-desc">Left panel content goes here.</p>
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
