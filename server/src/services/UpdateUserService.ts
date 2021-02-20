import { getRepository } from 'typeorm';

import User from '../models/User';
import Address from '../models/Address';

import AppError from '../error/AppError';

interface Request {
  id: string;
  name: string;
  gender: string;
  hobbies: string;
  birth: string;
  country: string;
  city: string;
  biography: string;
}

class UpdateUserService {
  public async execute({
    id,
    name,
    gender,
    hobbies,
    birth,
    country,
    city,
    biography,
  }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(id);

    if (!user) {
      throw new AppError('Onl authenticated users can update profile!', 401);
    }

    const adressesRepository = getRepository(Address);

    const address = await adressesRepository.findOne(user.address_id);

    if (address && (address.country !== country || address.city !== city)) {
      address.country = country;
      address.city = city;

      await adressesRepository.save(address);
    }

    const dateTimestamp = new Date(birth);

    const userUpdated: User = {
      ...user,
      name,
      gender,
      hobbies,
      birth: dateTimestamp,
      biography,
    };

    await usersRepository.save(userUpdated);

    return userUpdated;
  }
}

export default UpdateUserService;
