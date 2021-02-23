import axios from 'axios';

const countriesCities = axios.create({
  baseURL: 'https://countriesnow.space/api/v0.1',
});

export default countriesCities;
