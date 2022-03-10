//
// ─── REACT ──────────────────────────────────────────────────────────────────────
//

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//
// ─── UI ─────────────────────────────────────────────────────────────────────────
//

import "./App.css";
import { MediaContextProvider } from "./utilities/Artsy";

//
// ─── COMPONENTS ─────────────────────────────────────────────────────────────────
//
import Navbar from "./shared/Navbar";

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";


//
// ─── CUSTOM ROUTES ──────────────────────────────────────────────────────────────
//

import RouteUser from "./routes/RouterUser";
import RouteGuest from "./routes/RouteGuest";

import Landing from "./components/Landing";


//
// ─── ACTIONS ────────────────────────────────────────────────────────────────────
//

import { loadUser } from "./redux/auth";


import Index from "./components/Admin/Index";
import Services from "./components/Admin/Services/Services";
import Edit from "./components/Admin/Services/Edit";



function App() {
  const dispatch = useDispatch();
  // ────────────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  // ────────────────────────────────────────────────────────────────────────────────

  return (
    <Router>
      <MediaContextProvider>
        <Navbar>
          <Switch>
            {/* NORMAL ROUTES */}
            <Route path="/" component={Landing} exact />
            {/* GUEST ROUTES */}
            <RouteGuest path="/login" component={Login} exact />
            <RouteGuest path="/register" component={Register} exact />

            {/* USER ROUTES */}
            <RouteUser path="/dashboard" component={Index} exact />
            <RouteUser path="/services" component={Services} exact />
            <Route component={Edit} path="/edit/:id" exact/>

           
          </Switch>
        </Navbar>
      </MediaContextProvider>
    </Router>
  );
}

export default App;
