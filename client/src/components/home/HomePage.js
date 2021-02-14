import React from "react";
import { NavLink } from "react-router-dom";

class HomePage extends React.Component {
  render() {
    return (
      <>
        <h1>Not super-necessary home page</h1>
        <p>
          <NavLink to="/projects">Projects</NavLink>
        </p>
        <p>
          <NavLink to="/fabrics">Fabrics</NavLink>
        </p>
        <p>
          <NavLink to="/patterns">Patterns</NavLink>
        </p>
      </>
    );
  }
}

export default HomePage;
