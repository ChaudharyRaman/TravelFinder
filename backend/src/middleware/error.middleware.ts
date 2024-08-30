import { Request, Response, NextFunction } from "express";
import HttpException from "../utils/exceptions/http.exception";

/**
 *  Error Middleware
 * @param error - HttpException
 * @param req - Request
 * @param res - Response
 * @param next - NextFunction
 */
function ErrorMiddleware(
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const status = error.status || 500;
  const message = error.message || "Something went wrong";

  res.status(status).send({
    status,
    message,
  });
}

export default ErrorMiddleware;
