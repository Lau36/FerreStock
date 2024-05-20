import { endpoints } from "./Index";
import axios from "axios";

const addProducts = async (body) => {
  const tokenAccess = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Token ${tokenAccess}`,
    },
  };

  const response = await axios.post(
    endpoints.products.addProducts,
    body,
    config
  );

  return response.data;
};

const getProducts = async () => {
  const tokenAccess = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Token ${tokenAccess}`,
    },
  };

  const response = await axios.get(endpoints.products.getProducts, config);

  return response.data;
};

const getProductDetails = async (productId) => {
  const tokenAccess = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Token ${tokenAccess}`,
    },
  };

  const response = await axios.get(
    `${endpoints.products.getProducts}${productId}/`,
    config
  );

  return response.data;
};

const updateProduct = async (body, productId) => {
  const tokenAccess = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Token ${tokenAccess}`,
    },
  };
  const response = await axios.put(
    endpoints.products.updateProduct(productId),
    body,
    config
  );
  return response.data;
};

const deleteProduct = async (productId) => {
  const tokenAccess = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Token ${tokenAccess}`,
    },
  };
  const response = await axios.delete(
    endpoints.products.deleteProduct(productId),
    config
  );
  return response.data;
};

const getSedes = async () => {
  const tokenAccess = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Token ${tokenAccess}`,
    },
  };

  const response = await axios.get(endpoints.products.getSedes, config);

  return response.data;
};

const getProductsSede = async (sedeId) => {
  const tokenAccess = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Token ${tokenAccess}`,
    },
  };

  const response = await axios.get(
    endpoints.products.getProductsSede(sedeId),
    config
  );

  return response.data;
};

const getOrders = async () => {
  const tokenAccess = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Token ${tokenAccess}`,
    },
  };

  const response = await axios.get(endpoints.products.getOrders, config);

  return response.data;
};

const updateStatusOrder = async (orderId) => {
  const tokenAccess = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Token ${tokenAccess}`,
    },
  };
  const body = {
    order_id: orderId,
  };

  const response = await axios.post(
    endpoints.products.updateStatusOrders,
    body,
    config
  );
  return response;
};

const createOrder = async (body) => {
  const tokenAccess = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Token ${tokenAccess}`,
    },
  };
  const response = await axios.post(
    endpoints.products.createOrder,
    body,
    config
  );
  return response.data;
};

export {
  addProducts,
  getProducts,
  getProductDetails,
  updateProduct,
  getSedes,
  getProductsSede,
  getOrders,
  updateStatusOrder,
  createOrder,
  deleteProduct,
};
