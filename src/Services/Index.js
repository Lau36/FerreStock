const URL = "https://ferrestock-backend.onrender.com";

const endpoints = {
  products: {
    addProducts: `${URL}/inventory/products/`,
    getProducts: `${URL}/inventory/products/`,
    getProductDetails: (productId) => `${URL}/inventory/products/${productId}/`,
  },
};

const token = () => {
  const tokenAccess = localStorage.getItem("token");
  return tokenAccess;
};

export { endpoints, token };
