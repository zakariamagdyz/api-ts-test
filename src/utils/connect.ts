import mongoose from "mongoose";
import config from "config";
import log from "./logger";

function connect() {
  const dbUri = config.get<string>("dbUri");
  mongoose
    .connect(dbUri)
    .then(() => {
      log.info("DB connected successfully");
    })
    .catch(() => {
      log.error("DB failed to connect");
      process.exit(1);
    });
}

export default connect;
