import axios from "axios";

const BASE_URL = process.env.NODE_APP_API_URL;
const RESTAURANT_URL = `${BASE_URL}/tuits`;
console.log("TUITS_URL", TUITS_URL);

export const findRestaurant = async () => {
  const response = await axios.get(RESTAURANT_URL);
  const restaurant = response.data;
  return restaurant;
};
