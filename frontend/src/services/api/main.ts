import axios from 'axios';

const main = axios.create({
  baseURL: 'http://localhost:3333',
});

export default main;
