import axios from "axios";

export const api = axios.create({
  baseURL: "https://ferrestock-backend.onrender.com/",
});

// Agregar un interceptor de solicitudes
api.interceptors.request.use(
  (config) => {
    // Obtener el token del localStorage
    const token = localStorage.getItem("token");

    // Si hay un token, incluirlo en el encabezado de la solicitud
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const createsede = (
  username,
  email,
  password,
  address,
  contact,
  manager
) => {
  return api.post("inventory/create/", {
    username,
    email,
    password,
    address,
    contact,
    manager,
  });
};

export const createsupplier = (
  company_name,
  contact_name,
  address,
  tel,
  email
) => {
  return api.post("inventory/supplier/register/", {
    company_name,
    contact_name,
    address,
    tel,
    email
  });
};

export const login = (username, password) => {
  return api.post("inventory/api/token/", { username, password });
};

export const logout = (token) => {
  return api.post("inventory/api/logout/", null, {
    headers: {
      'Authorization': `Token ${token}`
    }
  });
};
