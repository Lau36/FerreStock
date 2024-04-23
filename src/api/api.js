import axios from "axios";

export const api = axios.create({
     baseURL: 'https://ferrestock-backend.onrender.com/'
  });

  // Agregar un interceptor de solicitudes
    api.interceptors.request.use(
    config => {
      // Obtener el token del localStorage
      const token = localStorage.getItem('token');
  
      // Si hay un token, incluirlo en el encabezado de la solicitud
      if (token) {
        config.headers.Authorization = `Token ${token}`;
      }
  
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );
  
  export const createsede = (username, email, password, address, contact, manager) => {
    return api.post('inventory/create/', { username, email, password, address, contact, manager });
  };

  export const login = (username, password) => {
    return api.post('inventory/api/token/', { username, password});
  };