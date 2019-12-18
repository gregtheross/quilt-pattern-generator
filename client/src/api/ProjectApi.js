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

export function saveProject(project) {
  return fetch(`/projects`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(project)
  })
    .then(handleResponse)
    .catch(handleError);
}
