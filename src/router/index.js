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
import Shift from "../screens/dashboard/shift/";
import ShiftOptions from "../screens/dashboard/shift/options";

import { createBrowserHistory } from "history";

const customHistory = createBrowserHistory();

export default function MainNavigation(props) {
  return (
    <Router>
      <div className="sidebar col-4 col-md-2">
        <div className="sidebar-menu"><Link to="/"><Icon.House width="22" height="22" color="#666"/> Home</Link></div>
        <div className="sidebar-menu"><Link to="/shift"><Icon.Person width="22" height="22" color="#666"/> Shift Data</Link></div>
      </div>
      <div className="main-dashboard col-12 col-md-10">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route><Route path="/shift">
            <ShiftFunction />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function ShiftFunction() {
  let { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path}>
        <Shift history={customHistory}/>
      </Route>
      <Route exact path={`${path}/:option`}>
        <ShiftOption />
      </Route>
      <Route exact path={`${path}/:option?/:shiftID`}>
        <ShiftOption />
      </Route>
    </Switch>
  );
}

function ShiftOption() {
  let { path } = useRouteMatch();
  let { option, shiftID } = useParams();
  return (
    <Switch>
      <Route exact path={`${path}/:shiftID`}>
        <ShiftOptions history={customHistory} option={option} shiftID={shiftID}/>
      </Route>
      <Route exact path={`${path}`}>
        <ShiftOptions history={customHistory} option={option}/>
      </Route>
    </Switch>
  );
}