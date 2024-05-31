const URL = "https://ferrestock-backend.onrender.com";

const endpoints = {
  products: {
    addProducts: `${URL}/inventory/products/`,
    getProducts: `${URL}/inventory/products/`,
    getProductDetails: (productId) => `${URL}/inventory/products/${productId}/`,
    updateProduct: (productId) => `${URL}/inventory/products/${productId}/`,
    deleteProduct: (productId) => `${URL}/inventory/products/${productId}/`,
    deleteOrder: (orderId) => `${URL}/inventory/order/delete/${orderId}/`,
    deleteOrderItem: (orderItemId) => `${URL}/inventory/order-item/delete/${orderItemId}/`,
    getSedes: `${URL}/inventory/users/`,
    getProductsSede: (sedeId) =>
      `${URL}/inventory/products/users/?user=${sedeId}`,
    getOrders: `${URL}/inventory/orders/`,
    updateStatusOrders: `${URL}/inventory/order/update-order-status/`,
    updateStock: `${URL}/inventory/products/pending/`,
    createOrder: `${URL}/inventory/order/create/`,
    saleStock: `${URL}/inventory/products/sales/`,
  },
  supplier: {
    getSuppliers: `${URL}/inventory/suppliers/`,
  },
};

const token = () => {
  const tokenAccess = localStorage.getItem("token");
  return tokenAccess;
};

export { endpoints, token };
