import axios from "axios";

export const api = axios.create({
     baseURL: 'https://ferrestock-backend.onrender.com/'
  });
  
  export const createsede = (username, email, password, address, contact, manager) => {
    return api.post('inventory/create/', { username, email, password, address, contact, manager });
  };