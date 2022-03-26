import express from "express";
import config from "config";
import connect from "./utils/connect";
import log from "./utils/logger";
import userRouter from "./routers/userRouter";

const port = config.get<number>("port");

const app = express();

app.use(express.json());

app.use("/api/v1/users", userRouter);

app.listen(port, () => {
  log.info(`App is running at http://localhost:${port}`);
  connect();
});
