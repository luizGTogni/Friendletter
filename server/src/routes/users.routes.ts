import { Router } from 'express';

import UserController from '../controllers/UserController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();

const userController = new UserController();

usersRouter.get('/', ensureAuthenticated, userController.show);
usersRouter.post('/', userController.create);

// usersRouter.put('/', ensureAuthenticated, async (request, response) => {});

// usersRouter.delete('/', ensureAuthenticated, async (request, response) => {});

export default usersRouter;
