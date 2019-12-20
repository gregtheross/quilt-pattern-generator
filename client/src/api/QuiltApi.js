import { handleResponse, handleError } from "./ApiUtils";

export function getShapeTypes() {
  return fetch("/shape-types")
    .then(handleResponse)
    .catch(handleError);
}
