import { countriesCities } from '../services/api';

interface CountriesData {
  data: string[];
  error: boolean;
  msg: string;
}

export const getCities = async (country: string): Promise<string[]> => {
  const response = await countriesCities.post('countries/cities', { country });
  const cities: CountriesData = response.data;

  return cities.data;
};
