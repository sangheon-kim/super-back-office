import HttpException from './http.exception';

class ServerException extends HttpException {
  constructor(message: string) {
    super(500, message);
  }
}

export default ServerException;
