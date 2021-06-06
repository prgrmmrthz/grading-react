import React, { useContext } from "react";
import {
  Switch,
  Route
} from "react-router-dom";

import SideNav from "./SideNav";
import MyFooter from "./Footer";
import PurchaseOrders from "./PurchaseOrders";
import Dashboard from "./Dashboard";
import Suppliers from "./Suppliers";
import StockAdjustment from "./StockAdjustment";
import AdjustedStock from "./AdjustedStock";
import Login from "./Login";
import { AuthContext } from "../context/AuthContext";
import Protected from "./Protected";
import NotFound from "./NotFound";
import StockInEntry from "./StockInEntry";
import StockInRecievingList from "./StockInRecievingList";

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
              <Route exact path="/purchase-orders">
                <Protected cmp={PurchaseOrders} />
              </Route>
              <Route exact path="/stock-adjustment">
                <Protected cmp={StockAdjustment} />
              </Route>
              <Route exact path="/adjusted-stock">
                <Protected cmp={AdjustedStock} />
              </Route>
              <Route exact path="/stock-in-entry">
                <Protected cmp={StockInEntry} />
              </Route>
              <Route exact path="/suppliers">
                <Protected cmp={Suppliers} />
              </Route>
              <Route exact path="/stock-in-list">
                <Protected cmp={StockInRecievingList} />
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
