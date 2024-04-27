const URL = "https://ferrestock-backend.onrender.com";

const endpoints = {
  products: {
    addProducts: `${URL}/inventory/products/`,
  },
};

const token = () => {
  const tokenAccess = localStorage.getItem("token");
  return tokenAccess;
};

export { endpoints, token };
