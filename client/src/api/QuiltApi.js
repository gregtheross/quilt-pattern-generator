import { handleResponse, handleError } from "./ApiUtils";

export function getShapeTypes() {
  return fetch("/shape-types")
    .then(handleResponse)
    .catch(handleError);
}

export function getFabrics() {
  return fetch("/fabrics")
    .then(handleResponse)
    .catch(handleError);
}
