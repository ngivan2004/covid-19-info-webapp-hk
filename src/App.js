import React from "react";
import "./App.css";

import AppAppbar from "./components/navigation/AppAppbar";

import HomeAll from "./pages/Home/HomeAll";
import HKIndepth from "./pages/HKIndepth";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <>
      <AppAppbar />
      <Router>
        <Switch>
          <Route exact path="/">
            <HomeAll />
          </Route>
          <Route exact path="/hkindepth">
            <HKIndepth />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
