import React, {useContext, useEffect} from "react";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import SideNav from "./SideNav";
import MyFooter from './Footer';
import PurchaseOrders from "./PurchaseOrders";
import Dashboard from "./Dashboard";
import Suppliers from "./Suppliers";
import StockAdjustment from "./StockAdjustment";
import AdjustedStock from './AdjustedStock';
import StockIn from './StockIn';
import Login from "./Login";
import { AuthContext } from "../context/AuthContext";

export default function MainPage() {
  const [auth, setAuth] = useContext(AuthContext);

  return (
    <div id="layoutSidenav">
      {auth.isAuthenticated && <SideNav />}
      <div id="layoutSidenav_content">
        <main>
          <div className="container-fluid">
            <br />
                <Route exact path="/" component={Login} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="/purchase-orders" component={PurchaseOrders} />
                <Route exact path="/stock-adjustment" component={StockAdjustment} />
                <Route exact path="/adjusted-stock" component={AdjustedStock} />
                <Route exact path="/suppliers" component={Suppliers} />
                <Route exact path="/stock-in" component={StockIn} />
          </div>
        </main>
        <MyFooter />
      </div>
    </div>
  );
}
