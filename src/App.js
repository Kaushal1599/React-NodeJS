import React, { Fragment } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Update from "./components/pages/Update";
import About from "./components/pages/About";
import Leave from "./components/pages/Leave";
import Form from "./components/pages/Form";
import Authstate from "./components/auth/Authstate";
import setAuthToken from "./utils/setAuthToken";
import register from "./components/Logs/register";
import login from "./components/Logs/login";
import Private from "./components/routing/Private";
if (localStorage.token) {
  setAuthToken(localStorage.token);
}
const App = () => {
  return (
    <Authstate>
      <Router>
        <Fragment>
          <Navbar />
          <div className="container">
            <Switch>
              <Private exact path="/update" component={Update} />
              <Private exact path="/leave" component={Leave} />
              <Private exact path="/form" component={Form} />
              <Route exact path="/about" component={About} />
              <Route exact path="/register" component={register} />
              <Route exact path="/Login" component={login} />
            </Switch>
          </div>
        </Fragment>
      </Router>
    </Authstate>
  );
};

export default App;
