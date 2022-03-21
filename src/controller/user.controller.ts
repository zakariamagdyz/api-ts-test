import { CreateUserInput } from "./../schema/user.schema";
import { Request, Response } from "express";
import log from "../utils/logger";
import { createUser } from "../services/user.service";
import { omitFileds, selectFields } from "../utils/utilities";

export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput>,
  res: Response
) {
  const filterdBody = selectFields(req.body, ["name", "email", "password"]);
  try {
    const user = await createUser(filterdBody);
    res.send(omitFileds(JSON.stringify(user), ["password"]));
  } catch (e: any) {
    log.error(e);
    return res.status(409).send(e.message);
  }
}
