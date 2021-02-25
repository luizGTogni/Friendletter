import { getCustomRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '../models/User';

import AppError from '../error/AppError';

import CreateAddressService from './CreateAddressService';
import UsersRepository from '../repositories/UsersRepository';

interface Request {
  username: string;
  name: string;
  email: string;
  password: string;
  gender: string;
  hobbies?: string;
  birth: string;
  country: string;
  city: string;
  avatar_url?: string;
  biography?: string;
}

class CreateUserService {
  public async execute({
    username,
    name,
    email,
    password,
    gender,
    birth,
    country,
    city,
  }: Request): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

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
      address,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
