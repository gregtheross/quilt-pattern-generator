import React from "react";
import { NavLink } from "react-router-dom";
import * as ProjectApi from "../../api/ProjectApi";

class ProjectsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      projectsList: [],
      loading: true
    };
  }

  componentDidMount() {
    ProjectApi.getProjects()
      .then(response => {
        this.setState({ projectsList: response, loading: false });
      })
      .catch(error => {
        console.log(error);
        this.setState({ loading: false });
      });
  }

  handleNewProjectClick = () => {
    alert("not implemented");
  };

  render() {
    return (
      <>
        <h1>projects page</h1>
        <button onClick={this.handleNewProjectClick}>
          Create a new project
        </button>
        <h2>Current Projects</h2>
        {this.state.loading ? (
          <p>LOADING...</p>
        ) : this.state.projectsList && this.state.projectsList.length > 0 ? (
          <table>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Shape</th>
              <th>Dimensions</th>
            </tr>
            {this.state.projectsList.map(project => {
              return (
                <tr key={project.id}>
                  <td>{project.id}</td>
                  <td>
                    <NavLink to={`/project/${project.id}`}>
                      {project.name}
                    </NavLink>
                  </td>
                  <td>{project.shapeType}</td>
                  <td>{project.dimensions}</td>
                </tr>
              );
            })}
          </table>
        ) : (
          <p>you don't have any projects</p>
        )}
        <h2>TODOS</h2>
        <p>todo: create an edit project page (edit quilt, edit fabrics)</p>
        <p>todo: use the current QuiltContainer as the "edit project" page</p>
        <p>todo: create a "manage fabrics" page</p>
      </>
    );
  }
}

export default ProjectsPage;
