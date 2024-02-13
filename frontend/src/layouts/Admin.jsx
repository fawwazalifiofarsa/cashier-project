import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// components

import Sidebar from "../components/Sidebar.jsx";
import Header from "../components/Header.jsx";

// views

import Dashboard from "../views/admin/Dashboard.jsx";
import Meja from "../views/admin/Meja.jsx";
import Menu from "../views/admin/Menu.jsx";
import Transaksi from "../views/admin/Transaksi.jsx";
import DetailTransaksi from "../views/admin/DetailTransaksi.jsx";
import User from "../views/admin/User.jsx";

export default function Admin() {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 ">
        {/* Header */}
        <Header />
        <div className="px-4 md:px-10 mx-auto w-full -m-24 ">
          <Switch>
            <Route path="/admin/dashboard" exact component={Dashboard} />
            <Route path="/admin/user" exact component={User} />
            <Route path="/admin/menu" exact component={Menu} />
            <Route path="/admin/meja" exact component={Meja} />
            <Route path="/admin/transaksi" exact component={Transaksi} />
            <Route path="/admin/detail" exact component={DetailTransaksi} />
            <Redirect from="/admin" to="/admin/dashboard" />
          </Switch>
        </div>
      </div>
    </>
  );
}

