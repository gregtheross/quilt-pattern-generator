import { handleResponse, handleError } from "./ApiUtils";

export function getPatterns() {
  return fetch("/patterns")
    .then(handleResponse)
    .catch(handleError);
}

export function getPattern(id) {
  return fetch(`/patterns/${id}`)
    .then(handleResponse)
    .catch(handleError);
}

export function savePattern(pattern) {
  return fetch(`/patterns`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(pattern)
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deletePattern(patternId) {
  return fetch(`/patterns`, {
    method: "DELETE",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ id: patternId })
  })
    .then(handleResponse)
    .catch(handleError);
}
