const URL = "https://ferrestock-backend.onrender.com";

const endpoints = {
  products: {
    addProducts: `${URL}/inventory/products/`,
    getProducts: `${URL}/inventory/products/`,
    getProductDetails: (productId) => `${URL}/inventory/products/${productId}/`,
    updateProduct: (productId) => `${URL}/inventory/products/${productId}/`,
    getSedes: `${URL}/inventory/users/`,
    getProductsSede: (sedeId) => `${URL}/inventory/products/users/?user=${sedeId}`,
    getOrders: `${URL}/inventory/orders/`,
    updateStatusOrders: `${URL}/inventory/order/update-order-status/`
  },
};

const token = () => {
  const tokenAccess = localStorage.getItem("token");
  return tokenAccess;
};

export { endpoints, token };
