import React, { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
} from "react-router-dom";

import SideNav from "./SideNav";
import MyFooter from "./Footer";
import PurchaseOrders from "./PurchaseOrders";
import Dashboard from "./Dashboard";
import Suppliers from "./Suppliers";
import StockAdjustment from "./StockAdjustment";
import AdjustedStock from "./AdjustedStock";
import StockIn from "./StockIn";
import Login from "./Login";
import { AuthContext } from "../context/AuthContext";
import Protected from "./Protected";
import NotFound from "./NotFound";

function MainPage() {
  const [auth, setAuth] = useContext(AuthContext);

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
              <Route exact path="/purchase-orders">
                <Protected cmp={PurchaseOrders} />
              </Route>
              <Route exact path="/stock-adjustment">
                <Protected cmp={StockAdjustment} />
              </Route>
              <Route exact path="/adjusted-stock">
                <Protected cmp={AdjustedStock} />
              </Route>
              <Route exact path="/stock-in">
                <Protected cmp={StockIn} />
              </Route>
              <Route exact path="/suppliers">
                <Protected cmp={Suppliers} />
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
