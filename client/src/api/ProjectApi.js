import { handleResponse, handleError } from "./ApiUtils";

export function getProjects() {
  return fetch("/projects")
    .then(handleResponse)
    .catch(handleError);
}
