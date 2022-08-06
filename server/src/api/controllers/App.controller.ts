import { NextFunction, Request, Response } from 'express';
import HttpException from 'src/api/common/exceptions/http.exception';

class AppController {
  constructor() {}

  async getApp(req: Request, res: Response, next: NextFunction) {
    try {
      const { err } = req.query;

      if (err === 'true') throw new HttpException(500, 'Baaaam 에러발생!');

      res.send('Hello 상헌!');
    } catch (err) {
      next(err);
    }
  }

  async getOneTest(req: Request, res: Response, next: NextFunction) {
    try {
      const { appId } = req.params;
      const { err } = req.query;

      if (err === 'true') throw new HttpException(500, 'Baaaam 에러발생!');

      res.send({
        name: '상헌',
        age: 28,
        appId,
      });
    } catch (err) {
      next(err);
    }
  }
}

export default new AppController();
