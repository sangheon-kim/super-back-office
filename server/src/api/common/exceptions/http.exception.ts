class HttpException extends Error {
  constructor(public statusCode: number = 500, message = 'Something Went wrong') {
    super(message);
    this.statusCode = statusCode;
  }
}

export default HttpException;
