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

export { addProducts };
