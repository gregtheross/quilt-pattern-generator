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
    this.props.history.push("/project");
  };

  render() {
    return (
      <>
        <h1>Projects</h1>
        <button onClick={this.handleNewProjectClick}>
          Create a new project
        </button>
        {this.state.loading ? (
          <p>LOADING...</p>
        ) : this.state.projectsList && this.state.projectsList.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Shape</th>
                <th>Dimensions</th>
              </tr>
            </thead>
            <tbody>
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
            </tbody>
          </table>
        ) : (
          <p>you don't have any projects</p>
        )}
        <h2>TODOS</h2>
        <p>todo: create a "manage fabrics" page</p>
      </>
    );
  }
}

export default ProjectsPage;
