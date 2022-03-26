import express from "express";
// controller
import { createUserHandler } from "../controller/user.controller";
// middlewares
import validateResource from "../middleware/validateResource";
// schemas
import { createUserSchema } from "../schema/user.schema";

const router = express.Router();

router.post("/signup", validateResource(createUserSchema), createUserHandler);

export default router;
