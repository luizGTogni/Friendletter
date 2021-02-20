import { Router } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRouter = Router();

interface Request {
  username?: string;
  email?: string;
  password: string;
}

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

interface AuthenticateUserData {
  user: UserDTO;
  token: string;
}

sessionsRouter.post('/login', async (request, response) => {
  const { username, email, password }: Request = request.body;

  const authenticateUser = new AuthenticateUserService();

  const { user, token }: AuthenticateUserData = await authenticateUser.execute({
    username,
    email,
    password,
  });

  delete user.password;

  return response.json({ user, token });
});

export default sessionsRouter;
