import axios from "axios";

export const navbarFilterApi = async (dataforFilter) => {
  const response = await axios.post(
    `http://localhost:5000/api/rentallistings/search`,
    dataforFilter
  );
  return response.data;
};
