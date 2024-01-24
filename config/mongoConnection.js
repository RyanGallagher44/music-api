import { MongoClient } from "mongodb";
import settings from "./settings.json" assert { type: "json" };

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
