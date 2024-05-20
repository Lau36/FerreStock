import { endpoints } from "./Index";
import axios from "axios";

const getSuppliers = async () => {
  const tokenAccess = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Token ${tokenAccess}`,
    },
  };

  const response = await axios.get(endpoints.supplier.getSuppliers, config);
  return response.data;
};

export { getSuppliers };
