import { toast } from "react-toastify";
import axios from "axios";

const baseURL = "https://ahorra-ya-backend.onrender.com/"

const createImageService = (token, data) => {
  const formData = new FormData();
  formData.append("file", data.file);

  // Agregar dinámicamente "store" u "offer" si están presentes
  if (data.store) {
    formData.append("store", data.store);
  }
  if (data.offer) {
    formData.append("offer", data.offer);
  }

  return new Promise((resolve, reject) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .post(baseURL + "image/", formData, config)
      .then((response) => {
        resolve(response.data.message);
      })
      .catch((error) => {
        reject(error);
        toast.error(error.response?.data?.message || "Error al subir la imagen");
      });
  });
};

const getStoreImage = (token, id) => {
    return new Promise((resolve, reject) => {
      axios
        .get(baseURL + `image/store/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: "arraybuffer",
        })
        .then((response) => {
          const imageBlob = new Blob([response.data], { type: "image/jpeg" });
          const imageURL = URL.createObjectURL(imageBlob);
          resolve(imageURL);
        })
        .catch((error) => {
          reject(error);
          toast.error(error.response.data.message);
        });
    });
  };
  

const getOfferImage = (token, id) => {
  return new Promise((resolve, reject) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: "arraybuffer",
    };
    axios
      .get(baseURL + `image/offer/${id}`, config)
      .then((response) => {
        const imageBlob = new Blob([response.data], { type: "image/jpeg" });
        const imageURL = URL.createObjectURL(imageBlob);
        resolve(imageURL);
      })
      .catch((error) => {
        reject(error);
        toast.error(error.response.data.message);
      });
  });
};

const getInfoStoreImage = (token, id) => {
  return new Promise((resolve, reject) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .get(baseURL + `image/info/store/${id}`, config)
      .then((response) => {
        resolve(response.data[0].idImage);
      })
      .catch((error) => {
        reject(error.response.data.message);
        toast.error(error.response.data.message);
      });
  });
};

const getInfoOfferImage = (token, id) => {
  return new Promise((resolve, reject) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .get(baseURL + `image/info/offer/${id}`, config)
      .then((response) => {
        resolve(response.data[0].idImage);
      })
      .catch((error) => {
        reject(error.response.data.message);
        toast.error(error.response.data.message);
      });
  });
};

const updateImageService = (token, data) => {
  return new Promise((resolve, reject) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    };
    axios
      .put(baseURL + "image/", data, config)
      .then((response) => {
        resolve(response.data.message);
      })
      .catch((error) => {
        reject(error.response.data.message);
        toast.error(error.response.data.message);
      });
  });
};


export { createImageService, getStoreImage, getOfferImage, getInfoStoreImage, getInfoOfferImage, updateImageService };
