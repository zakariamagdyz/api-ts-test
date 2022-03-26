export default class HttpError extends Error {
  public isOperational: boolean;
  public status: string;

  constructor(public message: string, public statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}
