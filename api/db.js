import mysql from "mysql";
import { dbConfig }  from "./db.config.js";

export const db = mysql.createPool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
});
