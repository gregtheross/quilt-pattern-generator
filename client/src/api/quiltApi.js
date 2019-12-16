import { handleResponse, handleError } from "./apiUtils";

export function getShapeTypes() {
  return fetch("/shape-types")
    .then(handleResponse)
    .catch(handleError);
}
