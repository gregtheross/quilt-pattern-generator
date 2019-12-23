import { handleResponse, handleError } from "./ApiUtils";

export function getFabrics() {
  return fetch("/fabrics")
    .then(handleResponse)
    .catch(handleError);
}

export function saveFabric(fabricData) {
  const isFileUpload = fabricData.imageType === "upload";

  const formData = new FormData();
  formData.append("imageType", fabricData.imageType);
  formData.append("imageFile", fabricData.imageFile);

  return fetch(`/fabrics`, {
    method: "POST",
    headers: isFileUpload ? {} : { "content-type": "application/json" },
    body: isFileUpload
      ? formData
      : JSON.stringify({
          imageType: fabricData.imageType,
          imageUrl: fabricData.imageUrl
        })
  })
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
