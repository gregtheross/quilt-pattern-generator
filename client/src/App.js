import React from "react";
import "./App.css";
import { Route, Switch, NavLink } from "react-router-dom";
import HomePage from "./components/home/HomePage";
import QuiltContainer from "./components/quilts/QuiltContainer";
import ProjectsPage from "./components/projects/ProjectsPage";

import PageNotFound from "./PageNotFound";

class App extends React.Component {
  render() {
    return (
      <>
        <nav>
          <NavLink to="/">Home</NavLink>
          {" | "}
          <NavLink to="/projects">Projects</NavLink>
          {" | "}
          <NavLink to="/quilt">Quilt</NavLink>
        </nav>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/projects" component={ProjectsPage} />
          <Route exact path="/quilt" component={QuiltContainer} />
          <Route component={PageNotFound} />
        </Switch>
      </>
    );
  }
}

export default App;
