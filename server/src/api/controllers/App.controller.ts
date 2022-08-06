import { NextFunction, Request, Response } from 'express';
import HttpException from 'src/api/common/exceptions/http.exception';

class AppController {
  constructor() {}

  async getApp(req: Request, res: Response, next: NextFunction) {
    try {
      const { err, success } = req.query;

      if (err === '1') {
        throw new HttpException(500, 'Baaaam 에러발생!');
      }
      if (success === 'object') {
        res.send({
          name: '상헌',
          age: 28,
        });
      }
      res.send('Hello 상헌!');
    } catch (err) {
      next(err);
    }
  }
}

export default new AppController();
