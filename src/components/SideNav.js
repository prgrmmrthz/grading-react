import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function SideNav() {
  const [auth, setAuth] = useContext(AuthContext);

  const [linksData, setlinksData] = useState([
    {
      group: "Inventory",
      links2: [
        { text: "Suppliers", link: "/suppliers" },
        { text: "Stock Adjustment", link: "/stock-adjustment" },
        { text: "Adjusted Stock", link: "/adjusted-stock" },
        { text: "Stock-In-Entry", link: "/stock-in-entry" },
        { text: "Stock-In-List", link: "/stock-in-list" },
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
            <div className="sb-sidenav-menu-heading">Core</div>
            <Link className="nav-link" to="/dashboard">
              <div className="sb-nav-link-icon">
                <i className="fas fa-tachometer-alt"></i>
              </div>
              Dashboard
            </Link>
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
