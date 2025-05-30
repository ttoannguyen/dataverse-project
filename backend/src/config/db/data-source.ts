import { DataSource } from "typeorm";
import { User } from "../../models/User";
import config from "../config";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: config.db.host,
  port: config.db.port,
  username: config.db.username,
  password: config.db.password,
  database: config.db.database,
  synchronize: config.db.synchronize, // DEVELOPMENT ONLY
  logging: config.db.logging,
  entities: [__dirname + "/../../models/*.ts"],
});
