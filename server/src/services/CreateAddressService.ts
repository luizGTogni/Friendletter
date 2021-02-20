import { getRepository } from 'typeorm';

import Address from '../models/Address';

interface Request {
  country: string;
  city: string;
}

class CreateAddressService {
  public async execute({ country, city }: Request): Promise<Address> {
    const adressesRepository = getRepository(Address);

    const address = adressesRepository.create({
      country,
      city,
    });

    await adressesRepository.save(address);

    return address;
  }
}

export default CreateAddressService;
