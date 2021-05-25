import "bootstrap/dist/css/bootstrap.min.css";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { BrowserRouter as Router } from "react-router-dom";

import MyNavbar from "./components/MyNavbar";
import MainPage from "./components/MainPage";

function App() {
  return (
    <Router>
      <div className="App">
        <MyNavbar />
        <MainPage />
      </div>
    </Router>
  );
}

export default App;
