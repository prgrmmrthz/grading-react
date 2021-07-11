import React, { useContext } from "react";
import {
  Switch,
  Route
} from "react-router-dom";

import SideNav from "./SideNav";
import MyFooter from "./Footer";
import Dashboard from "./Dashboard";
import Login from "./Login";
import { AuthContext } from "../context/AuthContext";
import Protected from "./Protected";
import NotFound from "./NotFound";
import AttendanceCalendar from "./AttendanceCalendar";
import GradeSection from "./GradeSection";
import StudentEntry from "./StudentEntry";
import SubjectEntry from "./SubjectEntry";
import ClassroomSetup from "./ClassroomSetup";
import Enroll from "./Enroll";
import AttendanceSheet from "./AttendanceSheet";
import OthersGradingSheet from "./OthersGradingSheet";

function MainPage() {
  const [auth] = useContext(AuthContext);

  return (
    <div id="layoutSidenav">
      {auth.isAuthenticated && <SideNav />}
      <div id="layoutSidenav_content">
        <main>
          <div className="container-fluid">
            <br />
            <Switch>
              <Route exact path="/" component={Login} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/dashboard">
                <Protected cmp={Dashboard} />
              </Route>
              <Route exact path="/attendance-calendar">
                <Protected cmp={AttendanceCalendar} />
              </Route>
              <Route exact path="/grade-section">
                <Protected cmp={GradeSection} />
              </Route>
              <Route exact path="/student-entry">
                <Protected cmp={StudentEntry} />
              </Route>
              <Route exact path="/subject-entry">
                <Protected cmp={SubjectEntry} />
              </Route>
              <Route exact path="/classroom-setup">
                <Protected cmp={ClassroomSetup} />
              </Route>
              <Route exact path="/enroll">
                <Protected cmp={Enroll} />
              </Route>
              <Route exact path="/attendance-sheet">
                <Protected cmp={AttendanceSheet} />
              </Route>
              <Route exact path="/others-grading-sheet">
                <Protected cmp={OthersGradingSheet} />
              </Route>
              <Route path="*" component={NotFound} />
            </Switch>
          </div>
        </main>
        <MyFooter />
      </div>
    </div>
  );
}

export default MainPage;
