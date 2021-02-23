import { countriesCities } from '../services/api';

interface CountryData {
  name: string;
  long: number;
  lat: number;
}

interface CountriesData {
  data: CountryData[];
}

export const getCountries = async (): Promise<string[]> => {
  const countriesName: string[] = [];
  const response = await countriesCities.get('countries/positions');
  const countries: CountriesData = response.data;

  countries.data.forEach(country => countriesName.push(country.name));

  return countriesName;
};
