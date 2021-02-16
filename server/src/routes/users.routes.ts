import { Router } from 'express';
import { v4 as uuid } from 'uuid';

const usersRouter = Router();

interface Address {
  country: string;
  city: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  gender: string;
  hobbies: string[];
  birth: Date;
  address: Address[];
  avatar_url: string;
  biography: string;
}

const users: User[] = [];

usersRouter.get('/', (request, response) => {
  return response.json(users);
});

usersRouter.post('/', (request, response) => {
  const {
    name,
    email,
    password,
    gender,
    hobbies,
    birth,
    address,
    avatar_url,
    biography,
  } = request.body;

  const user: User = {
    id: uuid(),
    name,
    email,
    password,
    gender,
    birth,
    hobbies,
    address,
    avatar_url,
    biography,
  };

  users.push(user);

  delete user.password;

  return response.json(user);
});

export default usersRouter;
