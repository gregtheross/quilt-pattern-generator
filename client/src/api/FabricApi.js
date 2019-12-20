import { handleResponse, handleError } from "./ApiUtils";

export function getFabrics() {
  return fetch("/fabrics")
    .then(handleResponse)
    .catch(handleError);
}

export function deleteFabric(fabricId) {
  return fetch(`/fabrics`, {
    method: "DELETE",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ id: fabricId })
  })
    .then(handleResponse)
    .catch(handleError);
}
