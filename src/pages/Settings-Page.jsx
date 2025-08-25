import "../page-css/settings-page.css";
import { useTheme } from "../context/theme-context";
import HeaderBar from "../components/ui-basic-reusables/page-elements/header-bar";
import avatar from "../components/img/user/default-user-light_web.png";

function SettingsPage() {
  const { theme } = useTheme();

  return (
    <div className={theme === "dark" ? "dark-mode" : ""}>
      <div className="settings-page">
        <HeaderBar />
        <main
          className="settings-page-main-content"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            className="settings-page-left-panel"
            style={{ textAlign: "center" }}
          >
            <h2 className="settings-page-panel-title">SETTINGS</h2>
            <img src={avatar} alt="landing" className="settings-image" />
          </div>
          <div
            className="settings-page-left-panel"
            style={{ textAlign: "center" }}
          >
            <h2 className="settings-page-panel-title">SETTINGS</h2>
            <p className="settings-page-panel-desc">
              Left panel content goes here.
            </p>
          </div>
          <div
            className="settings-page-left-panel"
            style={{ textAlign: "center" }}
          >
            <h2 className="settings-page-panel-title">SETTINGS</h2>
            <p className="settings-page-panel-desc">
              Left panel content goes here.
            </p>
          </div>
          <div
            className="settings-page-left-panel"
            style={{ textAlign: "center" }}
          >
            <h2 className="settings-page-panel-title">SETTINGS</h2>
            <p className="settings-page-panel-desc">
              Left panel content goes here.
            </p>
          </div>
        </main>
        <footer className="settings-page-footer">
          <p>Footer Content</p>
        </footer>
      </div>
    </div>
  );
}

export default SettingsPage;
