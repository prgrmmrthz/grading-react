import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function SideNav() {
  const [auth] = useContext(AuthContext);

  const [linksData] = useState([
    {
      group: "Set Up",
      links2: [
        { text: "Attendance Calendar", link: "/attendance-calendar" },
        { text: "Grade & Section", link: "/grade-section" },
        { text: "Student Master List", link: "/student-entry" },
        { text: "Subject Master List", link: "/subject-entry" },
        { text: "Classroom", link: "/classroom-setup" },
        { text: "Enroll", link: "/enroll" },
      ],
    },
    {
      group: "Transactions",
      links2: [
        { text: "Grading Sheet", link: "/grading-sheet" },
        { text: "Grading Sheet (Others)", link: "/others-grading-sheet" },
      ],
    },
  ]);
  return (
    <div id="layoutSidenav_nav">
      <nav
        className="sb-sidenav accordion sb-sidenav-dark"
        id="sidenavAccordion"
      >
        <div className="sb-sidenav-menu">
          <div className="nav">
            {linksData.map((v) => (
              <div>
                <div className="sb-sidenav-menu-heading">{v.group}</div>
                {v.links2.map((l) => (
                  <Link key={l.link}
                    className="nav-link collapsed"
                    to={l.link}
                    data-toggle="collapse"
                    data-target="#collapseLayouts"
                    aria-expanded="false"
                    aria-controls="collapseLayouts"
                  >
                    <div className="sb-nav-link-icon">
                      <i className="fas fa-columns"></i>
                    </div>
                    {l.text}
                    <div className="sb-sidenav-collapse-arrow">
                      <i className="fas fa-angle-down"></i>
                    </div>
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="sb-sidenav-footer">
          <div className="small">Logged in as:</div>
          {auth.user || ''}
        </div>
      </nav>
    </div>
  );
}
