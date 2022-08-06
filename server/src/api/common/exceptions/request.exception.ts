import HttpException from './http.exception';

class RequestException extends HttpException {
  constructor(message: string) {
    super(400, message);
  }
}

export default RequestException;
