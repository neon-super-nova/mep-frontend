import "../page-css/submit-report-page.css";
import { useTheme } from "../context/theme-context";
import HeaderBar from "../components/ui-basic-reusables/page-elements/header-bar";
import avatar from "../components/img/user/default-user-light_web.png";

function ReportPage() {
  const { theme } = useTheme();

  return (
    <div className={theme === "dark" ? "dark-mode" : ""}>
      <div className="report-page">
        <HeaderBar />
        <main
          className="report-page-main-content"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <div
            className="report-page-left-panel"
            style={{ textAlign: "center" }} >
            <h2 className="report-page-panel-title">SUBMIT REPORT</h2>
            <img src={avatar} alt="landing" className="report-image" />
          </div>
          <div
            className="report-page-left-panel"
            style={{ textAlign: "center" }}>
            <h2 className="report-page-panel-title">SUBMIT REPORT</h2>
            <p className="report-page-panel-desc">Left panel content goes here.</p>
          </div>
          <div
            className="report-page-left-panel"
            style={{ textAlign: "center" }}>
            <h2 className="report-page-panel-title">SUBMIT REPORT</h2>
            <p className="report-page-panel-desc">Left panel content goes here.</p>
          </div>
          <div
            className="report-page-left-panel"
            style={{ textAlign: "center" }}>
            <h2 className="report-page-panel-title">SUBMIT REPORT</h2>
            <p className="report-page-panel-desc">Left panel content goes here.</p>
          </div>
        </main>
        <footer className="report-page-footer">
          <p>Footer Content</p>
        </footer>
      </div>
    </div>
  );
}

export default ReportPage;
