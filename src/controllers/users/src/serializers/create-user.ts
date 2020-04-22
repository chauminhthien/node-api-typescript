import { NextFunction, Response, Request } from "express";
import { IUserCreateForm } from './../models';

export async function serializersUserCreate(req: Request, _: Response, next: NextFunction) {
  const form: IUserCreateForm = req.body;
  req.body = {
    email: form.email || "",
    fullname: form.fullname || "",
  }
  return next();
}