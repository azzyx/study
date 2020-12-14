import React from "react";
import { HashRouter, Route, Switch, Link } from "react-router-dom";
import { Award } from "../index";
import "./index.css";

const RouterIndex = () => {
  return (
    <HashRouter>
      <Link className="inline-block pd-r10 year" to="/2019">
        2019
      </Link>
      <Switch>
        <Route path="/2019">
          <Award data="2019" />
        </Route>
      </Switch>
    </HashRouter>
  );
};

export default RouterIndex;
