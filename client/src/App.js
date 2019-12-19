import React from "react";
import "./App.css";
import { Route, Switch, NavLink } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./components/home/HomePage";
import ProjectsPage from "./components/projects/ProjectsPage";
import Project from "./components/projects/Project";
import PageNotFound from "./PageNotFound";

class App extends React.Component {
  render() {
    return (
      <>
        <nav>
          <NavLink to="/">Home</NavLink>
          {" | "}
          <NavLink to="/projects">Projects</NavLink>
        </nav>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/projects" component={ProjectsPage} />
          <Route exact path="/project/:id" component={Project} />
          <Route exact path="/project" component={Project} />
          <Route component={PageNotFound} />
        </Switch>
        <ToastContainer autoClose={2000} />
      </>
    );
  }
}

export default App;
