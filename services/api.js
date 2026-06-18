import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api",
});

export const getEmployees = () =>
  API.get("/employees");

export const getAttendance = () =>
  API.get("/attendance");

export const detectFace = (data) =>
  API.post("/detect-face", data);

export default API;