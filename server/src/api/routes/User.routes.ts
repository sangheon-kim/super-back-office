import express from 'express';
import UserController from 'src/api/controllers/User.controller';

class UserRouter {
  router: express.Router;
  constructor(private controller: typeof UserController) {
    this.router = express.Router();
    this.init();
  }

  private init() {
    this.router.get('/', this.controller.getUsers);
    this.router.get('/:id', this.controller.getUser);
    this.router.post('/', this.controller.createUser);
    this.router.put('/:id', this.controller.updateUser);
    this.router.delete('/:id', this.controller.deleteUser);
  }
}

export default UserRouter;
