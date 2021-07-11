import "bootstrap/dist/css/bootstrap.min.css";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { BrowserRouter as Router } from "react-router-dom";

import MyNavbar from "./components/MyNavbar";
import MainPage from "./components/MainPage";
import { AuthProvider } from "./context/AuthContext";
import { GradingSheetProvider } from "./context/GradingSheetContext";
import { AttendanceSheetProvider } from "./context/AttendanceSheetContext";

function App() {
  return (
    <AuthProvider>
      <GradingSheetProvider>
        <AttendanceSheetProvider>
          <Router>
            <div className="App">
              <MyNavbar />
              <MainPage />
            </div>
          </Router>
        </AttendanceSheetProvider>
      </GradingSheetProvider>
    </AuthProvider>
  );
}

export default App;
