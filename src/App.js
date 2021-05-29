import "bootstrap/dist/css/bootstrap.min.css";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { BrowserRouter as Router } from "react-router-dom";

import MyNavbar from "./components/MyNavbar";
import MainPage from "./components/MainPage";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <MyNavbar />
          <MainPage />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
