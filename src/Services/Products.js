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

export { addProducts, getProducts, getProductDetails, updateProduct };
