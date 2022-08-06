class HttpException extends Error {
  constructor(public statusCode: number = 500, message = 'Something Went wrong') {
    super(message);
  }
}

export default HttpException;
