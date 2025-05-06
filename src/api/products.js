import axios from 'axios';

const API_URL = 'https://fakestoreapi.com/products';

export const FetchProducts = async (page = 1, limit = 6) => {
  try {
    const response = await axios.get(API_URL);
    const start = (page - 1) * limit;
    const paginated = response.data.slice(start, start + limit);
    return paginated;
  } catch (error) {
    throw new Error('Failed to fetch products.');
  }
};
