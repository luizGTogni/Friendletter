import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '../models/User';

import AppError from '../error/AppError';

import CreateAddressService from './CreateAddressService';

interface Request {
  username: string;
  name: string;
  email: string;
  password: string;
  gender: string;
  hobbies: string;
  birth: string;
  country: string;
  city: string;
  avatar_url: string;
  biography: string;
}

class CreateUserService {
  public async execute({
    username,
    name,
    email,
    password,
    gender,
    hobbies,
    birth,
    country,
    city,
    avatar_url,
    biography,
  }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const checkUsernameExists = await usersRepository.findOne({
      where: { username },
    });

    if (checkUsernameExists) {
      throw new AppError('Username address already used.');
    }

    const checkEmailExists = await usersRepository.findOne({
      where: { email },
    });

    if (checkEmailExists) {
      throw new AppError('Email address already used.');
    }

    const hashedPassword = await hash(password, 8);

    const birthTimestamp = new Date(birth);

    const createAddress = new CreateAddressService();

    const address = await createAddress.execute({ country, city });

    const user = usersRepository.create({
      username,
      name,
      email,
      password: hashedPassword,
      gender,
      birth: birthTimestamp,
      hobbies,
      biography,
      avatar_url,
      address,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
