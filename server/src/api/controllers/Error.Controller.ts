import { NextFunction, Request, Response } from 'express';
import HttpException from 'src/api/common/exceptions/http.exception';

class ErrorController {
  constructor() {}

  getError(error: HttpException, __: Request, res: Response, next: NextFunction) {
    res.send({
      success: false,
      status: error.statusCode,
      error: {
        message: error.message,
      },
    });
  }
  get404(_: Request, res: Response, next: NextFunction) {
    try {
      throw new HttpException(404, 'Not Found');
    } catch (err) {
      next(err);
    }
  }
}

export default new ErrorController();
