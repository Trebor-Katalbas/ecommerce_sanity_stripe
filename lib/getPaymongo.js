import axios from 'axios';

let paymongoAxiosInstance;

const getPayMongoAxios = () => {
  if (!paymongoAxiosInstance) {
    paymongoAxiosInstance = axios.create({
      baseURL: 'https://api.paymongo.com/v1/',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${Buffer.from(process.env.NEXT_PUBLIC_PAYMONGO_SECRET_KEY).toString('base64')}`
      }
    });
  }

  return paymongoAxiosInstance;
}

export default getPayMongoAxios;
