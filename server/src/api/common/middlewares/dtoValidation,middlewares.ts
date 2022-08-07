import { validate, ValidationError } from 'class-validator';
import { RequestHandler } from 'express';
import { plainToInstance } from 'class-transformer';
import HttpException from '../exceptions/http.exception';

export default function dtoValidationMiddleware(
  type: any,
  skipMissingProperties = false
): RequestHandler {
  return (req, res, next) => {
    const dtoObj = plainToInstance(type, req.body);

    validate(dtoObj, { skipMissingProperties })
      .then((errors: ValidationError[]) => {
        if (errors.length > 0) {
          const dtoErrors = errors
            .map((error: ValidationError) => (Object as any).values(error.constraints))
            .join(', ');
          throw new HttpException(400, dtoErrors);
        } else {
          req.body = dtoObj;
          next();
        }
      })
      .catch((err) => next(err));
  };
}
