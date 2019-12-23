import React from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import * as ProjectApi from "../../api/ProjectApi";
import Modal from "../utilities/Modal";

class ProjectsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      projectsList: [],
      loading: true,
      showDeleteConfirmationModal: false,
      projectIdToDelete: null
    };
  }

  componentDidMount() {
    this.loadProjects();
  }

  loadProjects = () => {
    ProjectApi.getProjects()
      .then(response => {
        this.setState({ projectsList: response, loading: false });
      })
      .catch(error => {
        toast.error("error fetching projects");
        console.log(error);
        this.setState({ loading: false });
      });
  };

  handleNewProjectClick = () => {
    this.props.history.push("/project");
  };

  handleDeleteButtonClick = projectId => {
    this.setState({
      showDeleteConfirmationModal: true,
      projectIdToDelete: projectId
    });
  };

  handleDeleteProjectModalConfirm = () => {
    ProjectApi.deleteProject(this.state.projectIdToDelete)
      .then(res => {
        toast.success("project deleted successfully");
        this.loadProjects();
      })
      .catch(error => {
        toast.error("an error occurred while deleting project");
      });
    this.setState({
      showDeleteConfirmationModal: false,
      projectIdToDelete: null
    });
  };

  handleDeleteProjectModalCancel = () => {
    this.setState({
      showDeleteConfirmationModal: false,
      projectIdToDelete: null
    });
  };

  render() {
    return (
      <>
        <Modal
          show={this.state.showDeleteConfirmationModal}
          message="Are you sure you want to delete this project?"
          onConfirm={this.handleDeleteProjectModalConfirm}
          onCancel={this.handleDeleteProjectModalCancel}
        />
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
                <th></th>
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
                    <td>
                      <button
                        onClick={() => this.handleDeleteButtonClick(project.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p>you don't have any projects</p>
        )}
      </>
    );
  }
}

export default ProjectsPage;
