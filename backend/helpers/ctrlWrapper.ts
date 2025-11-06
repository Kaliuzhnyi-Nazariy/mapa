import { NextFunction, Request, Response } from "express";

type IContoroller = (req: Request, res: Response, next: NextFunction) => any;

const ctrlWrapper = (ctrl: IContoroller) => {
  const fn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await ctrl(req, res, next);
    } catch (error) {
      next(error);
    }
  };
  return fn;
};

export default ctrlWrapper;
