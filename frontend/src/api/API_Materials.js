import axios from "axios";
import { Master_URL_API_Material } from "../static/Master_URL";
import { getToken } from "./Session";

export function createMaterial(id, materialInfo, selectedFile) {
  const formData = new FormData();
  formData.append("id", id);
  formData.append("title", materialInfo.title);
  formData.append("content", materialInfo.content);
  formData.append("file", selectedFile);
  axios({
    method: "POST",
    url: `${Master_URL_API_Material}create?token=${getToken()}`,
    headers: { "Content-Type": "multipart/form-data" },
    data: formData,
  });
}
// For all
export function getMaterialInCourse(id, setloading, setMaterials) {
  setloading(true);
  const formData = new FormData();
  formData.append("id", id);
  axios({
    method: "POST",
    url: `${Master_URL_API_Material}in-course?token=${getToken()}`,
    headers: { "Content-Type": "application/json" },
    data: formData,
  }).then((response) => {
    setMaterials(response.data.materials);
    setloading(false);
  });
}

// For teacher
export function getMaterialInfo(id, setMaterialInfo) {
  const formData = new FormData();
  formData.append("id", id);
  axios({
    method: "POST",
    url: `${Master_URL_API_Material}get-info?token=${getToken()}`,
    headers: { "Content-Type": "application/json" },
    data: formData,
  }).then((response) => {
    setMaterialInfo(response.data.material);
  });
}

// For teacher
export function updateMaterial(id, materialInfo, selectedFile) {
  const formData = new FormData();
  formData.append("id", id);
  formData.append("title", materialInfo.materialTitle);
  formData.append("content", materialInfo.materialContent);
  formData.append("file", selectedFile);
  axios({
    method: "POST",
    url: `${Master_URL_API_Material}update?token=${getToken()}`,
    headers: { "Content-Type": "application/json" },
    data: formData,
  });
}

// For teacher
export function deleteMaterial(id) {
  const formData = new FormData();
  formData.append("id", id);
  axios({
    method: "POST",
    url: `${Master_URL_API_Material}delete?token=${getToken()}`,
    headers: { "Content-Type": "application/json" },
    data: formData,
  });
}
