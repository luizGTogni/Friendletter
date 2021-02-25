import { Request, Response } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';

interface RequestData {
  email?: string;
  password: string;
}

interface UserData {
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
  user: UserData;
  token: string;
}

class SessionController {
  async login(request: Request, response: Response): Promise<Response> {
    const { email, password }: RequestData = request.body;

    const authenticateUser = new AuthenticateUserService();

    const {
      user,
      token,
    }: AuthenticateUserData = await authenticateUser.execute({
      email,
      password,
    });

    delete user.password;

    return response.json({ user, token });
  }
}

export default SessionController;
