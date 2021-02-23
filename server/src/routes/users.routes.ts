import { Router } from 'express';
import { getRepository } from 'typeorm';

import User from '../models/User';

import CreateUserService from '../services/CreateUserService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();

interface UserDTO {
  username: string;
  name: string;
  email: string;
  password?: string;
  gender: string;
  hobbies: string;
  birth: Date;
  address_id: string;
  avatar_url: string;
  biography: string;
}

usersRouter.get('/', ensureAuthenticated, async (request, response) => {
  const usersRepository = getRepository(User);
  const users = await usersRepository.find();

  return response.json(users);
});

usersRouter.post('/fieldAlreadyExists', async (request, response) => {
  const { username, email } = request.body;

  const usersRepository = getRepository(User);

  const existsUsername = !!(await usersRepository.findOne({
    where: { username },
  }));
  const existsEmail = !!(await usersRepository.findOne({ where: { email } }));

  return response.json({ username: existsUsername, email: existsEmail });
});

usersRouter.post('/', async (request, response) => {
  const {
    name,
    username,
    email,
    password,
    gender,
    birth,
    country,
    city,
    avatar_url,
  } = request.body;

  const createUser = new CreateUserService();

  const user: UserDTO = await createUser.execute({
    username,
    name,
    email,
    password,
    gender,
    birth,
    country,
    city,
    avatar_url,
  });

  delete user.password;

  return response.json(user);
});

// usersRouter.put('/', ensureAuthenticated, async (request, response) => {});

// usersRouter.delete('/', ensureAuthenticated, async (request, response) => {});

export default usersRouter;
