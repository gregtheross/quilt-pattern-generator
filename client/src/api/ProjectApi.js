import { handleResponse, handleError } from "./ApiUtils";

export function getProjects() {
  return fetch("/projects")
    .then(handleResponse)
    .catch(handleError);
}

export function getProject(id) {
  return fetch(`/projects/${id}`)
    .then(handleResponse)
    .catch(handleError);
}
