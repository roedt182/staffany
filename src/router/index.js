import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch
} from "react-router-dom";
import * as Icon from 'react-bootstrap-icons';

import Home from "../screens/dashboard/home/home";

import { createBrowserHistory } from "history";

const customHistory = createBrowserHistory();

export default function MainNavigation(props) {
  return (
    <Router>
      <div className="sidebar col-4 col-md-2">
        <div className="sidebar-menu"><Link to="/"><Icon.House width="22" height="22" color="#666"/> Home</Link></div>
      </div>
      <div className="main-dashboard col-12 col-md-10">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}