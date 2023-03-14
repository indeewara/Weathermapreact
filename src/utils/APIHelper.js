import axios from 'axios';

const apiKey = process.env.REACT_APP_API_KEY;
const URL = process.env.REACT_APP_API_URL;

export async function APIHelper(idList) {
  try {
    const response = await axios.get(`${URL}/group?id=${idList}&units=metric&appid=${apiKey}`);
    return response;
  } catch (error) {
    throw new Error(`API call failed with status code ${error.response.status}`);
  }
}
