import { NextFunction, Request, Response } from 'express';
import User from 'src/models/User/User.model';
import UserRepository from 'src/models/User/User.repository';

class UserController {
  constructor(private userRepository: UserRepository) {}

  async getUsers(_: Request, res: Response, next: NextFunction) {
    try {
      const users = await this.userRepository.findAll();
      res.json(users);
    } catch (err) {
      next(err);
    }
  }

  async getUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const user = await this.userRepository.findById(id);
      res.json(user);
    } catch (err) {
      next(err);
    }
  }

  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await this.userRepository.create(req.body as User);

      res.json(user);
    } catch (err) {
      next(err);
    }
  }

  async updateUser(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
      const result = await this.userRepository.update(id, req.body as User);
      if (!result) throw new Error('No User');
      res.json(true);
    } catch (err) {
      next(err);
    }
  }

  async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await this.userRepository.delete(id);
      if (!result) throw new Error('No User');
      res.json(true);
    } catch (err) {
      next(err);
    }
  }
}

export default new UserController(new UserRepository());
