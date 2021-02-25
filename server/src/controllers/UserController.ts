import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';

import UsersRepository from '../repositories/UsersRepository';

import CreateUserService from '../services/CreateUserService';

interface UserData {
  name: string;
  username: string;
  email: string;
  password?: string;
  gender: string;
  hobbies: string;
  birth: Date;
  address_id: string;
  avatar_url: string;
  biography: string;
}

class UserController {
  async show(request: Request, response: Response): Promise<Response> {
    const usersRepository = getCustomRepository(UsersRepository);
    const users = await usersRepository.find();

    return response.json(users);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      username,
      email,
      password,
      gender,
      birth,
      country,
      city,
    } = request.body;

    const createUser = new CreateUserService();

    const user: UserData = await createUser.execute({
      username,
      name,
      email,
      password,
      gender,
      birth,
      country,
      city,
    });

    delete user.password;

    return response.json(user);
  }
}

export default UserController;
