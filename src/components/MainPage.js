import React from "react";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import SideNav from "./SideNav";
import MyFooter from './Footer';
import PurchaseOrders from "./PurchaseOrders";
import Dashboard from "./Dashboard";
import Suppliers from "./Suppliers";
import StockAdjustment from "./StockAdjustment";
import AdjustedStock from './AdjustedStock';

export default function MainPage() {
  return (
    <div id="layoutSidenav">
      <SideNav />
      <div id="layoutSidenav_content">
        <main>
          <div className="container-fluid">
            <br />
                <Route exact path="/" component={Dashboard} />
                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="/purchase-orders" component={PurchaseOrders} />
                <Route exact path="/stock-adjustment" component={StockAdjustment} />
                <Route exact path="/adjusted-stock" component={AdjustedStock} />
                <Route exact path="/suppliers" component={Suppliers} />
          </div>
        </main>
        <MyFooter />
      </div>
    </div>
  );
}
