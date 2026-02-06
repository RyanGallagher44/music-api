import { MongoClient } from "mongodb";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const settings = JSON.parse(fs.readFileSync(path.join(__dirname, "settings.json"), "utf8"));

const { serverUrl, database } = settings.mongoConfig;

let _connection = undefined;
let _db = undefined;

const dbConnection = async () => {
  if (!_connection) {
    _connection = await MongoClient.connect(serverUrl);
    _db = await _connection.db(database);
  }

  return _db;
};

const closeConnection = () => {
  _connection.close();
};

export { dbConnection, closeConnection };
