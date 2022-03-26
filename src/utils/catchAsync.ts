import { NextFunction, Request, RequestHandler, Response } from "express";

type asyncFunction = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>;

///
const catchAsync =
  (fn: asyncFunction): RequestHandler =>
  (req, res, next) =>
    fn(req, res, next).catch(next);

export default catchAsync;
