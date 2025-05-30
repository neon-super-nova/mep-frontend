import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/Routes";
import { ThemeProvider, useTheme }from "./context/theme-context.js";


function AppContent() {
  const { theme } = useTheme();
  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <div className="App">
        <AppRoutes />
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

export default App;
