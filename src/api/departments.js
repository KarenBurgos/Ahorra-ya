import axios from "axios";
import { toast } from "react-toastify";

const baseURL = "https://ahorra-ya-backend.onrender.com"

const getAllDepartmentsService = (token) => {
  return new Promise((resolve, reject) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .get(baseURL + "/departament/", config)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error.response.data.message);
        toast.error(error.response.data.message);
      });
  });
};


export { getAllDepartmentsService };