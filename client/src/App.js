import React from "react";
import "./App.css";
import { Route, Switch, NavLink } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./components/home/HomePage";
import ProjectsPage from "./components/projects/ProjectsPage";
import Project from "./components/projects/Project";
import CustomProject from "./components/projects/CustomProject";
import PageNotFound from "./PageNotFound";
import FabricsPage from "./components/fabrics/FabricsPage";
import AddFabricPage from "./components/fabrics/AddFabricPage";

class App extends React.Component {
  render() {
    return (
      <>
        <nav>
          <NavLink to="/">Home</NavLink>
          {" | "}
          <NavLink to="/projects">Projects</NavLink>
          {" | "}
          <NavLink to="/fabrics">Fabrics</NavLink>
        </nav>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/projects" component={ProjectsPage} />
          <Route exact path="/project/:id" component={Project} />
          <Route exact path="/project" component={Project} />
          <Route exact path="/custom-project/:id" component={CustomProject} />
          <Route exact path="/custom-project" component={CustomProject} />
          <Route exact path="/custom-pattern/:id" component={CustomPattern} />
          <Route exact path="/custom-pattern" component={CustomPattern} />
          <Route exact path="/fabrics" component={FabricsPage} />
          <Route exact path="/add-fabric" component={AddFabricPage} />
          <Route component={PageNotFound} />
        </Switch>
        <ToastContainer autoClose={2000} />
      </>
    );
  }
}

export default App;
