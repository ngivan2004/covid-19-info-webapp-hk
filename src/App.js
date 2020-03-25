import React from "react";
import "./App.css";

import AppAppbar from "./components/navigation/AppAppbar";

import HomeAll from "./pages/Home/HomeAll";
import HKIndepthAll from "./pages/HKIndepth/HKIndepthAll";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ImmigrationAll from "./pages/Immigration/ImmigrationAll";
import GlobalAll from "./pages/Global/GlobalAll";
import Source from "./pages/Source";

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
            <HKIndepthAll />
          </Route>
          <Route exact path="/immigration">
            <ImmigrationAll />
          </Route>
          <Route exact path="/global">
            <GlobalAll />
          </Route>
          <Route exact path="/source">
            <Source />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
